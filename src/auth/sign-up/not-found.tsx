import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, FileX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-2xl mx-4">
                <CardContent className="p-12 text-center">
                    <FileX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">ページが見つかりません</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        申し訳ございませんが、このページは現在利用できません。
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Home className="h-4 w-4 mr-2" />
                                トップに戻る
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

