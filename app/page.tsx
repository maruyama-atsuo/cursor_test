import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* ヘッダー */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
            AI Career Navigator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            あなたに合ったAI職業を診断
          </p>
        </div>

        {/* 説明カード */}
        <div className="card-glass p-8 md:p-12 space-y-6">
          <p className="text-lg text-gray-200 leading-relaxed">
            10問の質問に答えて、あなたに最適なAI関連職業を見つけましょう。
            <br />
            MBTI形式の診断で、16種類の職業タイプから提案します。
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-semibold mb-1">所要時間</div>
              <div className="text-gray-400">約3分</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-3xl mb-2">❓</div>
              <div className="font-semibold mb-1">質問数</div>
              <div className="text-gray-400">全10問</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-3xl mb-2">💼</div>
              <div className="font-semibold mb-1">職業タイプ</div>
              <div className="text-gray-400">16種類</div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-4">
          <Link href="/quiz" className="block">
            <button className="btn-primary w-full max-w-md mx-auto block text-lg py-4">
              診断を始める
            </button>
          </Link>

          <Link href="/careers" className="block">
            <button className="btn-secondary w-full max-w-md mx-auto block">
              全職業を見る
            </button>
          </Link>
        </div>

        {/* フッター */}
        <div className="text-sm text-gray-400 pt-8">
          <p>
            AIとキャリアの未来を探索しよう
          </p>
        </div>
      </div>
    </div>
  )
}
