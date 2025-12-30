import Link from 'next/link';
import { careers } from '@/data/careers';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ヘッダー */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-xl font-bold text-gray-900">AI Career Navigator</span>
            </Link>
            <Link href="/quiz">
              <button className="btn-primary text-sm py-2 px-6">
                診断を受ける
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="section-container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            AI職業図鑑
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            16種類のAI関連職業を探索しましょう。<br className="hidden md:block" />
            あなたの未来のキャリアがここにあるかもしれません。
          </p>
        </div>
      </section>

      {/* 職業グリッド */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {careers.map((career) => (
            <Link key={career.id} href={`/result/${career.id}`}>
              <div className="card-premium p-6 hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
                {/* アイコンとタイトル */}
                <div className="text-center mb-4">
                  <div className="text-5xl mb-4">{career.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {career.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{career.nameEn}</p>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${career.color}15`,
                      color: career.color,
                    }}
                  >
                    {career.id}
                  </div>
                </div>

                {/* 説明 */}
                <p className="text-sm text-gray-600 line-clamp-4 mb-4 flex-grow">
                  {career.description}
                </p>

                {/* スキルバッジ */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-700 mb-2">主要スキル:</div>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium"
                      >
                        {skill.length > 20 ? skill.substring(0, 20) + '...' : skill}
                      </span>
                    ))}
                    {career.skills.length > 2 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{career.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* 詳細を見るボタン */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-blue-600 text-sm font-semibold flex items-center justify-center gap-1 hover:gap-2 transition-all">
                    詳細を見る <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTAセクション */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            あなたに最適な職業を診断
          </h2>
          <p className="text-lg md:text-xl text-blue-100">
            科学的なMBTI診断で、16種類から最適なキャリアを提案します
          </p>
          <Link href="/quiz">
            <button className="bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              無料で診断を始める →
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
  );
}
