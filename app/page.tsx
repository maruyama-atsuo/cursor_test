'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ヘッダーナビゲーション */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎯</div>
              <h1 className="text-xl font-bold text-gray-900">AI Career Navigator</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/careers">
                <button className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  職業一覧
                </button>
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard">
                    <button className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      マイページ
                    </button>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link href="/login">
                  <button className="btn-primary text-sm py-2 px-6">
                    ログイン
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="section-container pt-20 pb-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* メインタイトル */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
              あなたに最適な<br />AI職業を発見
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              科学的なMBTI診断で、16種類のAI関連職業から<br className="hidden md:block" />
              あなたの可能性を最大化するキャリアを提案します
            </p>
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/quiz">
              <button className="btn-primary text-lg w-full sm:w-auto min-w-[240px]">
                無料で診断を始める
              </button>
            </Link>
            <Link href="/careers">
              <button className="btn-secondary w-full sm:w-auto min-w-[240px]">
                職業を見る
              </button>
            </Link>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">質問</div>
              <div className="text-xs text-gray-500 mt-1">約3分で完了</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">16</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">職業タイプ</div>
              <div className="text-xs text-gray-500 mt-1">詳細な分析</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">満足度</div>
              <div className="text-xs text-gray-500 mt-1">ユーザー評価</div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="section-container bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            診断の特徴
          </h2>
          <p className="text-lg text-gray-600">
            プロフェッショナルグレードの診断システム
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 特徴1 */}
          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">科学的根拠</h3>
            <p className="text-gray-600 leading-relaxed">
              MBTI理論に基づいた4軸診断で、あなたの性格と適性を正確に分析します
            </p>
          </div>

          {/* 特徴2 */}
          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">最新のAI職業</h3>
            <p className="text-gray-600 leading-relaxed">
              2025年最新のAI業界の職業データベースから、あなたに最適な道を提案
            </p>
          </div>

          {/* 特徴3 */}
          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">詳細なレポート</h3>
            <p className="text-gray-600 leading-relaxed">
              必要スキル、キャリアパス、年収など、詳細な情報を提供します
            </p>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="section-container bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            今すぐあなたのAIキャリアを発見
          </h2>
          <p className="text-lg md:text-xl text-blue-100">
            無料で診断できます。所要時間はわずか3分。
          </p>
          <Link href="/quiz">
            <button className="bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              診断を始める →
            </button>
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-sm text-gray-500">
            © 2025 AI Career Navigator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
