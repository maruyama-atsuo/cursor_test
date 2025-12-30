# AI Career Navigator - デプロイ手順

## 1. Supabaseデータベースのセットアップ

### データベーススキーマの適用

1. Supabaseダッシュボード (https://supabase.com/dashboard) にログイン
2. プロジェクト `yqwirzwmtnrmwrkoelmg` を選択
3. 左サイドバーから「SQL Editor」を選択
4. 「New query」をクリック
5. `supabase/schema.sql` ファイルの内容をコピー&ペースト
6. 「Run」ボタンをクリックして実行

これにより以下のテーブルが作成されます:
- `profiles`: ユーザープロフィール
- `quiz_results`: 診断結果
- `favorites`: お気に入り
- `learning_progress`: 学習進捗

### 認証プロバイダーの設定（任意）

#### Google OAuth
1. Authentication > Providers > Google を選択
2. 「Enable Google provider」を有効化
3. Google Cloud Console で OAuth 2.0 クライアントを作成
   - リダイレクトURI: `https://yqwirzwmtnrmwrkoelmg.supabase.co/auth/v1/callback`
4. Client ID と Client Secret を Supabase に設定

#### GitHub OAuth
1. Authentication > Providers > GitHub を選択
2. 「Enable GitHub provider」を有効化
3. GitHub Settings > Developer settings > OAuth Apps で新規作成
   - Authorization callback URL: `https://yqwirzwmtnrmwrkoelmg.supabase.co/auth/v1/callback`
4. Client ID と Client Secret を Supabase に設定

#### Email/Password
- デフォルトで有効化されています
- Authentication > Providers > Email で詳細設定が可能

## 2. Vercel環境変数の設定

### Vercel ダッシュボードでの設定

1. Vercel ダッシュボード (https://vercel.com/dashboard) にアクセス
2. プロジェクトを選択
3. Settings > Environment Variables に移動
4. 以下の環境変数を追加:

```
NEXT_PUBLIC_SUPABASE_URL=https://yqwirzwmtnrmwrkoelmg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxd2lyend3dG5ybXdya29lbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTI4MTAsImV4cCI6MjA1MTEyODgxMH0.sb_publishable_BlC67D3t1LIglCK067BMdQ_B9cPeRvK
```

5. 「Save」をクリック

### 環境の設定
- Production, Preview, Development すべてにチェックを入れることをお勧めします

## 3. デプロイ

### GitHubからの自動デプロイ

1. GitHubリポジトリにプッシュ
```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

2. Vercelが自動的にデプロイを開始します
3. デプロイ完了後、Vercel ダッシュボードでURLを確認

### 初回デプロイ後の確認事項

- [ ] ホームページが正常に表示される
- [ ] ログイン/サインアップが機能する
- [ ] 診断を受けて結果が保存される
- [ ] マイページで診断履歴が表示される
- [ ] お気に入り機能が動作する

## 4. ローカル開発環境のセットアップ

### 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の内容を記載:

```
NEXT_PUBLIC_SUPABASE_URL=https://yqwirzwmtnrmwrkoelmg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxd2lyend3dG5ybXdya29lbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTI4MTAsImV4cCI6MjA1MTEyODgxMH0.sb_publishable_BlC67D3t1LIglCK067BMdQ_B9cPeRvK
```

### 開発サーバーの起動

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

## トラブルシューティング

### 認証がうまくいかない場合

1. Supabase の Authentication > URL Configuration を確認
   - Site URL: プロダクションURL (例: https://your-app.vercel.app)
   - Redirect URLs: プロダクションURL と localhost:3000 を両方追加

### データベース接続エラー

1. 環境変数が正しく設定されているか確認
2. Supabase プロジェクトが正常に動作しているか確認
3. Row Level Security (RLS) ポリシーが正しく設定されているか確認

### ビルドエラー

1. `npm install` を再実行
2. `.next` フォルダを削除して再ビルド
3. Node.jsバージョンを確認 (v18以上推奨)

## 今後の拡張機能（未実装）

- [ ] MCPサーバー統合
- [ ] AIチャットボット
- [ ] 統計・分析ダッシュボード
- [ ] 学習進捗トラッキング
- [ ] SNSシェア機能の強化
