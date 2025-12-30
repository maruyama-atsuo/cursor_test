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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">結果が見つかりませんでした</h1>
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
      // フォールバック: URLをコピー
      navigator.clipboard.writeText(url);
      alert('URLをコピーしました！');
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            診断結果
          </h1>
          <p className="text-gray-300">あなたに合ったAI職業</p>
        </div>

        {/* 結果カード */}
        <div
          className="card-glass p-8 md:p-12 space-y-6"
          style={{ borderColor: career.color }}
        >
          {/* アイコンと職業名 */}
          <div className="text-center space-y-4">
            <div className="text-6xl md:text-8xl">{career.icon}</div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {career.name}
              </h2>
              <p className="text-lg text-gray-400">{career.nameEn}</p>
              <div
                className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: `${career.color}33`, color: career.color }}
              >
                {career.id}
              </div>
            </div>
          </div>

          {/* 説明 */}
          <div className="bg-white/5 rounded-xl p-6">
            <p className="text-gray-200 leading-relaxed">{career.description}</p>
          </div>

          {/* 必要なスキル */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>💡</span> 必要なスキル
            </h3>
            <ul className="space-y-2">
              {career.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-white/5 rounded-lg p-3 text-gray-200"
                >
                  • {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* 向いている人 */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>✨</span> 向いている人
            </h3>
            <ul className="space-y-2">
              {career.traits.map((trait, index) => (
                <li
                  key={index}
                  className="bg-white/5 rounded-lg p-3 text-gray-200"
                >
                  • {trait}
                </li>
              ))}
            </ul>
          </div>

          {/* キャリアパス */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>🚀</span> キャリアパス
            </h3>
            <div className="bg-white/5 rounded-lg p-4 text-gray-200">
              {career.careerPath}
            </div>
          </div>

          {/* 関連職業 */}
          {relatedCareersData.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span>🔗</span> 関連する職業
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                {relatedCareersData.map((relatedCareer) => (
                  <Link
                    key={relatedCareer!.id}
                    href={`/result/${relatedCareer!.id}`}
                  >
                    <div className="bg-white/5 hover:bg-white/10 rounded-lg p-4 text-center transition-all cursor-pointer">
                      <div className="text-3xl mb-2">{relatedCareer!.icon}</div>
                      <div className="text-sm font-semibold text-white">
                        {relatedCareer!.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="space-y-3">
          <button onClick={handleShare} className="btn-primary w-full">
            結果をシェアする
          </button>
          <Link href="/quiz">
            <button className="btn-secondary w-full">もう一度診断する</button>
          </Link>
          <Link href="/careers">
            <button className="btn-secondary w-full">全職業を見る</button>
          </Link>
          <Link href="/">
            <button className="btn-secondary w-full">トップに戻る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
