import Link from 'next/link';
import { careers } from '@/data/careers';

export default function CareersPage() {
  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text">
            AI職業一覧
          </h1>
          <p className="text-gray-300">
            16種類のAI関連職業を探索しましょう
          </p>
        </div>

        {/* 職業グリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <Link key={career.id} href={`/result/${career.id}`}>
              <div
                className="card-glass p-6 hover:scale-105 transition-all duration-300 cursor-pointer h-full"
                style={{ borderLeft: `4px solid ${career.color}` }}
              >
                <div className="space-y-4">
                  {/* アイコンとタイトル */}
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{career.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {career.name}
                      </h3>
                      <p className="text-sm text-gray-400">{career.nameEn}</p>
                      <div
                        className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{
                          backgroundColor: `${career.color}33`,
                          color: career.color,
                        }}
                      >
                        {career.id}
                      </div>
                    </div>
                  </div>

                  {/* 説明 */}
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {career.description}
                  </p>

                  {/* スキルプレビュー */}
                  <div className="flex flex-wrap gap-2">
                    {career.skills.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {career.skills.length > 2 && (
                      <span className="text-xs text-gray-400">
                        +{career.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* アクションボタン */}
        <div className="text-center space-y-3">
          <Link href="/quiz">
            <button className="btn-primary max-w-md w-full">
              診断を受ける
            </button>
          </Link>
          <br />
          <Link href="/">
            <button className="btn-secondary max-w-md w-full">
              トップに戻る
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
