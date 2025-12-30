# 🎯 AI Career Navigator

MBTI形式の診断で、あなたに最適なAI関連職業を提案するWebアプリケーション

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e)

## ✨ プロジェクト概要

このアプリケーションは、ユーザーの性格や志向性を10問の質問で診断し、16種類のAI関連職業の中から最適なキャリアを提案します。

### 主な特徴

- 🧠 **科学的診断**: MBTI理論に基づいた4軸診断システム
- 💼 **16種類のAI職業**: 研究者からクリエイターまで幅広い職業を用意
- 🎨 **モダンUI**: Google風のクリーンで洗練されたデザイン
- 🔐 **ユーザー認証**: Email、Google、GitHub OAuth対応
- 💾 **データ保存**: 診断結果の自動保存と履歴管理
- ⭐ **お気に入り**: 気になる職業をブックマーク
- 📊 **統計表示**: 診断回数や傾向を可視化
- 📱 **レスポンシブ**: モバイル・タブレット・デスクトップ対応

## 🚀 クイックスタート

### 必要な環境

- Node.js 18.0 以上
- Supabase アカウント（データベース機能を使う場合）

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/maruyama-atsuo/cursor_test.git
cd cursor_test

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集してSupabase認証情報を追加

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開く

### 📚 詳細なセットアップ手順

**重要: データベース機能を使うには追加設定が必要です**

1. **クイックスタート**: [QUICK_START.md](./QUICK_START.md) - 3分で始める！
2. **完全ガイド**: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - 全機能を有効化
3. **デプロイ手順**: [DEPLOYMENT.md](./DEPLOYMENT.md) - 本番環境へ

## 📁 プロジェクト構成

```
ai-career-navigator/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト（AuthProvider統合）
│   ├── page.tsx             # トップページ
│   ├── globals.css          # グローバルCSS
│   ├── quiz/                # 診断ページ
│   ├── result/[id]/         # 結果表示（お気に入り機能）
│   ├── careers/             # 全職業一覧
│   ├── login/               # ログインページ
│   ├── signup/              # サインアップページ
│   ├── dashboard/           # ユーザーダッシュボード
│   ├── history/             # 診断履歴
│   └── auth/callback/       # OAuth コールバック
├── components/              # Reactコンポーネント
│   ├── ProgressBar.tsx     # プログレスバー
│   └── QuestionCard.tsx    # 質問カード
├── data/                    # 静的データ
│   ├── careers.ts          # 16種類のAI職業データ
│   └── questions.ts        # 10問の診断質問データ
├── lib/                     # ユーティリティ
│   ├── types.ts            # TypeScript型定義
│   ├── quiz-logic.ts       # 診断ロジック
│   ├── auth-context.tsx    # 認証コンテキスト
│   ├── database.types.ts   # Supabase型定義
│   └── supabase/           # Supabaseクライアント
│       ├── client.ts       # クライアント側
│       └── server.ts       # サーバー側
├── supabase/                # データベース
│   ├── schema.sql          # DBスキーマ（RLS含む）
│   └── README.md           # DB設定手順
├── middleware.ts            # Next.js middleware（認証）
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

### フロントエンド
- **Next.js 14** - React フレームワーク（App Router）
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS

### バックエンド
- **Supabase** - PostgreSQL データベース
- **Supabase Auth** - 認証・認可（Email/Google/GitHub）
- **Row Level Security (RLS)** - データセキュリティ

### デプロイ
- **Vercel** - ホスティング（自動デプロイ）
- **GitHub** - バージョン管理

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

### Vercelへのデプロイ（自動）

GitHubにプッシュすると自動でデプロイされます！

```bash
git add .
git commit -m "Update application"
git push origin main
```

### 初回デプロイ時の設定

1. **Supabase データベースのセットアップ**
   - [DEPLOYMENT.md](./DEPLOYMENT.md) の手順に従ってSQLを実行

2. **Vercel 環境変数の設定**
   - Vercel Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を追加

3. **再デプロイ**
   - Deployments → Redeploy

詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストを歓迎します！

---

## 🔗 リンク

- **リポジトリ**: [GitHub](https://github.com/maruyama-atsuo/cursor_test)
- **本番環境**: [Vercel](https://cursor-test.vercel.app)
- **Supabase Dashboard**: [Supabase](https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg)

## 📚 ドキュメント

- [QUICK_START.md](./QUICK_START.md) - クイックスタートガイド
- [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - セットアップチェックリスト
- [DEPLOYMENT.md](./DEPLOYMENT.md) - デプロイ手順
- [supabase/README.md](./supabase/README.md) - データベース設定

---

**バージョン**: 2.0.0 (Supabase統合版)
**作成日**: 2025-12-30
**更新日**: 2025-12-30

Made with ❤️ using [Claude Code](https://claude.com/claude-code)
