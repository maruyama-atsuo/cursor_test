# AI Career Navigator

MBTI形式の診断で、あなたに合ったAI関連職業を提案するWebアプリケーション

## 🎯 プロジェクト概要

このアプリケーションは、ユーザーの性格や志向性を10問の質問で診断し、16種類のAI関連職業の中から最適なキャリアを提案します。

### 主な特徴

- **10問の診断**: 楽しく気軽に回答できる質問形式
- **16種類のAI職業**: 研究者からクリエイターまで幅広い職業を用意
- **MBTI形式の診断ロジック**: 4つの軸で性格を分析
- **詳細な結果表示**: 職業の説明、必要スキル、キャリアパスを提示
- **シェア機能**: 診断結果をSNSで共有可能
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 🚀 始め方

### 必要な環境

- Node.js 18.0 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ブラウザで開く
# http://localhost:3000
```

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## 📁 プロジェクト構成

```
ai-career-navigator/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # トップページ
│   ├── globals.css          # グローバルCSS
│   ├── quiz/                # 診断ページ
│   │   └── page.tsx
│   ├── result/[id]/         # 結果ページ（動的ルート）
│   │   └── page.tsx
│   └── careers/             # 全職業一覧
│       └── page.tsx
├── components/              # Reactコンポーネント
│   ├── ProgressBar.tsx     # プログレスバー
│   └── QuestionCard.tsx    # 質問カード
├── data/                    # データファイル
│   ├── questions.ts        # 診断質問データ
│   └── careers.ts          # AI職業定義データ
├── lib/                     # ユーティリティ
│   ├── types.ts            # TypeScript型定義
│   └── quiz-logic.ts       # 診断ロジック
└── public/                  # 静的ファイル
```

## 🧠 診断ロジック

### 4つの診断軸

診断は以下の4つの軸で行われます：

1. **思考スタイル (L-C)**
   - L (Logical): 論理的・分析的
   - C (Creative): 創造的・直感的

2. **作業スタイル (T-S)**
   - T (Technical): 技術志向・実装重視
   - S (Strategic): 戦略志向・設計重視

3. **人間関係 (I-C)**
   - I (Independent): 個人作業中心
   - C (Collaborative): チーム作業中心

4. **目的志向 (R-B)**
   - R (Research): 研究・探求志向
   - B (Business): ビジネス・実用志向

これらの組み合わせで **16通り** の職業タイプに分類されます。

## 💼 16種類のAI職業

| ID   | 職業名 |
|------|--------|
| LTIR | AIリサーチサイエンティスト |
| LTIB | AI研究開発エンジニア |
| LTCR | 機械学習エンジニア |
| LTCB | MLOpsエンジニア |
| LSIR | AIアルゴリズムデザイナー |
| LSIB | AIソリューションアーキテクト |
| LSCR | データサイエンティスト |
| LSCB | AIプロダクトマネージャー |
| CTIR | 生成AIクリエイター（研究系） |
| CTIB | プロンプトエンジニア |
| CTCR | AIコンテンツクリエイター |
| CTCB | AI UX/UIデザイナー |
| CSIR | AI倫理研究者 |
| CSIB | AIビジネスコンサルタント |
| CSCR | AIトレーナー / アノテーター |
| CSCB | AIストラテジスト |

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ホスティング**: Vercel（推奨）

## 📝 カスタマイズ

### 質問の追加・変更

`data/questions.ts` を編集して、質問内容やスコアリングを変更できます。

```typescript
{
  id: 1,
  question: '質問文',
  options: [
    {
      id: 'A',
      text: '選択肢A',
      scores: { L: 3, R: 2 }, // スコアを設定
    },
    // ...
  ],
}
```

### 職業の追加・変更

`data/careers.ts` を編集して、職業の説明やスキル要件を変更できます。

```typescript
{
  id: 'LTIR',
  name: '職業名',
  description: '説明文...',
  skills: ['スキル1', 'スキル2', ...],
  // ...
}
```

## 🎨 デザインのカスタマイズ

`app/globals.css` と `tailwind.config.ts` でカラーやスタイルを変更できます。

```typescript
// tailwind.config.ts
colors: {
  primary: '#6366f1',    // プライマリカラー
  secondary: '#8b5cf6',  // セカンダリカラー
  accent: '#06b6d4',     // アクセントカラー
}
```

## 🚀 デプロイ

### Vercelへのデプロイ（推奨）

1. GitHubにプッシュ
2. [Vercel](https://vercel.com)でインポート
3. 自動デプロイ完了！

### その他のプラットフォーム

- Netlify
- Cloudflare Pages
- AWS Amplify

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストを歓迎します！

---

## 🌐 本番環境

**公開URL**: https://ai-career-navigator-swart.vercel.app

このアプリケーションはVercelで公開されており、GitHubにプッシュすると自動的にデプロイされます。

---

**作成日**: 2025-12-30
**バージョン**: 1.0.0
