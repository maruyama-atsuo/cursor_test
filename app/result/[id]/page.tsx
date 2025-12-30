'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { careers } from '@/data/careers';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const careerId = params.id as string;

  const career = careers.find((c) => c.id === careerId);

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center space-y-4 card-premium p-12">
          <h1 className="text-2xl font-bold text-gray-900">結果が見つかりませんでした</h1>
          <Link href="/">
            <button className="btn-primary">トップに戻る</button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedCareersData = career.relatedCareers
    .map((id) => careers.find((c) => c.id === id))
    .filter((c) => c !== undefined);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `私のAI職業診断結果は「${career.name}」でした！ #AICareerNavigator`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'AI Career Navigator', text, url });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('URLをコピーしました！');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ヘッダー */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2 w-fit">
            <span className="text-2xl">🎯</span>
            <span className="text-lg font-bold text-gray-900">AI Career Navigator</span>
          </Link>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* 結果ヘッダー */}
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
            <span className="text-blue-600 font-semibold text-sm">診断結果</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            あなたに最適なAI職業
          </h1>
        </div>

        {/* 結果カード */}
        <div className="card-elevated overflow-hidden">
          {/* ヘッダーセクション - カラフルな背景 */}
          <div
            className="p-8 md:p-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${career.color}15 0%, ${career.color}05 100%)`
            }}
          >
            <div className="text-7xl md:text-8xl mb-6">{career.icon}</div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {career.name}
              </h2>
              <p className="text-xl text-gray-600 mb-4">{career.nameEn}</p>
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: `${career.color}20`, color: career.color }}
              >
                タイプ: {career.id}
              </div>
            </div>
          </div>

          {/* コンテンツセクション */}
          <div className="p-8 md:p-12 space-y-10">
            {/* 説明 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: career.color }}></div>
                <h3 className="text-2xl font-bold text-gray-900">職業の特徴</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl">
                {career.description}
              </p>
            </div>

            {/* 必要なスキル */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: career.color }}></div>
                <h3 className="text-2xl font-bold text-gray-900">必要なスキル</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {career.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${career.color}20` }}>
                      <span className="text-xs font-bold" style={{ color: career.color }}>✓</span>
                    </div>
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 向いている人 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: career.color }}></div>
                <h3 className="text-2xl font-bold text-gray-900">こんな人に向いています</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {career.traits.map((trait, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4"
                  >
                    <span className="text-blue-600 text-xl flex-shrink-0">✨</span>
                    <span className="text-gray-700 font-medium">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* キャリアパス */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: career.color }}></div>
                <h3 className="text-2xl font-bold text-gray-900">キャリアパス</h3>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-gray-700 text-lg font-medium">
                  <span className="text-2xl">🚀</span>
                  <span>{career.careerPath}</span>
                </div>
              </div>
            </div>

            {/* 関連職業 */}
            {relatedCareersData.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: career.color }}></div>
                  <h3 className="text-2xl font-bold text-gray-900">関連する職業</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedCareersData.map((relatedCareer) => (
                    <Link
                      key={relatedCareer!.id}
                      href={`/result/${relatedCareer!.id}`}
                    >
                      <div className="card-premium p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                        <div className="text-4xl mb-3">{relatedCareer!.icon}</div>
                        <div className="text-sm font-bold text-gray-900 mb-1">
                          {relatedCareer!.name}
                        </div>
                        <div className="text-xs text-gray-500">{relatedCareer!.nameEn}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-4">
          <button onClick={handleShare} className="btn-primary w-full text-lg">
            🔗 結果をシェアする
          </button>
          <div className="grid md:grid-cols-3 gap-3">
            <Link href="/quiz" className="block">
              <button className="btn-secondary w-full">もう一度診断</button>
            </Link>
            <Link href="/careers" className="block">
              <button className="btn-secondary w-full">全職業を見る</button>
            </Link>
            <Link href="/" className="block">
              <button className="btn-secondary w-full">トップへ</button>
            </Link>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © 2025 AI Career Navigator. あなたのAIキャリアを応援します。
          </p>
        </div>
      </div>
    </div>
  );
}
