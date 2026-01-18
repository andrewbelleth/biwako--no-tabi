'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@/types'
import type { AuthContextValue, LoginCredentials } from '../types'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // セッション確認
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // プロファイル情報を取得
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.name || undefined,
              role: profile.role as 'admin' | 'user',
              createdAt: new Date(profile.created_at),
            })
          } else {
            // プロファイルがない場合、auth.usersから情報を取得
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || undefined,
              role: 'user',
              createdAt: new Date(session.user.created_at),
            })
          }
        }
      } catch (error) {
        console.error('認証確認エラー:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // プロファイル情報を取得
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.name || undefined,
              role: profile.role as 'admin' | 'user',
              createdAt: new Date(profile.created_at),
            })
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || undefined,
              role: 'user',
              createdAt: new Date(session.user.created_at),
            })
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        throw new Error(error.message || 'メールアドレスまたはパスワードが正しくありません')
      }

      if (data.user) {
        // プロファイル情報を取得
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()
        
        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name || undefined,
            role: profile.role as 'admin' | 'user',
            createdAt: new Date(profile.created_at),
          })
        } else {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || undefined,
            role: 'user',
            createdAt: new Date(data.user.created_at),
          })
        }
      }
    } catch (error) {
      setIsLoading(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setUser(null)
    } catch (error) {
      console.error('ログアウトエラー:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
