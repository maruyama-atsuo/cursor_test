import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Career Navigator - あなたに合ったAI職業を診断',
  description: 'MBTI形式の診断で、あなたに最適なAI関連職業を提案します。10問の質問に答えて、あなたのAIキャリアを見つけよう。',
  keywords: ['AI', 'キャリア', '診断', 'MBTI', '職業', '適性'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
