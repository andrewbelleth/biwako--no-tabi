'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@/types'
import type { AuthContextValue, LoginCredentials } from '../types'

const AuthContext = createContext<AuthContextValue | null>(null)

// プレースホルダー: 将来Supabase認証に置き換え予定
const MOCK_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: '管理者',
  role: 'admin',
  createdAt: new Date(),
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // プレースホルダー: 将来Supabase認証のセッション確認に置き換え
    const checkAuth = () => {
      const storedAuth = typeof window !== 'undefined' 
        ? sessionStorage.getItem('auth')
        : null
      if (storedAuth === 'true') {
        setUser(MOCK_USER)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    // プレースホルダー: 将来Supabase認証に置き換え
    // 現在はメールが admin@example.com でパスワードが admin の場合のみログイン成功
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin') {
      setUser(MOCK_USER)
      sessionStorage.setItem('auth', 'true')
    } else {
      throw new Error('メールアドレスまたはパスワードが正しくありません')
    }
    setIsLoading(false)
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    // プレースホルダー: 将来Supabase認証に置き換え
    await new Promise((resolve) => setTimeout(resolve, 300))
    setUser(null)
    sessionStorage.removeItem('auth')
    setIsLoading(false)
  }, [])

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
