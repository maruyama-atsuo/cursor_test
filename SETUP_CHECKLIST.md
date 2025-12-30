# セットアップチェックリスト

開発サーバーが http://localhost:3001 で起動しています！

## 🎯 必須設定（このままでは動作しません）

### ✅ 完了済み
- [x] Supabaseプロジェクト作成
- [x] 環境変数ファイル (.env.local) 作成
- [x] Supabaseクライアント設定
- [x] 認証機能実装
- [x] GitHubへプッシュ
- [x] 開発サーバー起動 (http://localhost:3001)

### ⚠️ これからやる必要があること

#### 1. Supabaseのデータベーススキーマを適用（必須）

**手順:**
1. https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg にアクセス
2. 左サイドバーの「SQL Editor」をクリック
3. 「New query」ボタンをクリック
4. 下記のSQLをコピー&ペーストして「Run」

**実行するSQL:**
プロジェクトの `supabase/schema.sql` ファイル全体をコピー&ペースト

**確認方法:**
- SQL Editor で実行後、エラーが出ないことを確認
- Database → Tables で以下のテーブルが作成されていることを確認:
  - profiles
  - quiz_results
  - favorites
  - learning_progress

---

#### 2. Vercelの環境変数を設定（必須）

**手順:**
1. https://vercel.com/dashboard にアクセス
2. プロジェクト「cursor_test」を選択
3. 「Settings」→「Environment Variables」に移動
4. 以下の2つの環境変数を追加:

**環境変数1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://yqwirzwmtnrmwrkoelmg.supabase.co
Environment: Production, Preview, Development (全てチェック)
```

**環境変数2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxd2lyend3dG5ybXdya29lbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTI4MTAsImV4cCI6MjA1MTEyODgxMH0.sb_publishable_BlC67D3t1LIglCK067BMdQ_B9cPeRvK
Environment: Production, Preview, Development (全てチェック)
```

5. 「Save」をクリック
6. 「Deployments」タブに移動
7. 最新のデプロイメントの「...」メニューから「Redeploy」を選択

**確認方法:**
- Settings → Environment Variables で2つの変数が表示されることを確認
- Redeploy後、デプロイメントが成功することを確認

---

#### 3. Supabaseの認証設定（推奨）

##### Email認証の設定
1. https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg/auth/providers にアクセス
2. 「Email」プロバイダーの設定を確認
3. 「Confirm email」をオフにすると、メール確認なしでテスト可能

##### Google OAuth（任意）
1. Authentication → Providers → Google
2. 「Enable Google provider」をON
3. Google Cloud Console (https://console.cloud.google.com) にアクセス
4. プロジェクト作成 → 「APIs & Services」→「認証情報」
5. 「認証情報を作成」→「OAuth 2.0 クライアント ID」
6. アプリケーションの種類: ウェブアプリケーション
7. 承認済みのリダイレクト URI に追加:
   ```
   https://yqwirzwmtnrmwrkoelmg.supabase.co/auth/v1/callback
   ```
8. クライアント IDとシークレットをコピー
9. Supabaseの設定画面に貼り付けて保存

##### GitHub OAuth（任意）
1. Authentication → Providers → GitHub
2. 「Enable GitHub provider」をON
3. https://github.com/settings/developers にアクセス
4. 「New OAuth App」をクリック
5. 以下を入力:
   - Application name: AI Career Navigator
   - Homepage URL: https://your-vercel-url.vercel.app
   - Authorization callback URL: `https://yqwirzwmtnrmwrkoelmg.supabase.co/auth/v1/callback`
6. クライアント IDとシークレットをコピー
7. Supabaseの設定画面に貼り付けて保存

---

## 🧪 動作確認手順

### ローカル環境で確認
1. http://localhost:3001 にアクセス
2. 右上の「ログイン」をクリック
3. 「メールで登録」タブから新規アカウント作成
4. 診断を受けて結果が保存されるか確認
5. マイページで履歴が表示されるか確認

### 本番環境で確認
1. Vercelのデプロイメント完了後、URLにアクセス
2. 同様に登録・診断を実施
3. 全機能が動作することを確認

---

## 📋 機能チェックリスト

デプロイ後、以下の機能をテストしてください:

- [ ] ホームページが正しく表示される
- [ ] ログイン/サインアップページが表示される
- [ ] メールアドレスで新規登録できる
- [ ] ログインできる
- [ ] 診断を受けることができる
- [ ] 診断結果がマイページに保存される
- [ ] 診断履歴ページで過去の結果が見れる
- [ ] お気に入り機能が動作する
- [ ] ログアウトできる

---

## ❓ トラブルシューティング

### エラー: "Error fetching user"
→ Vercelの環境変数が設定されていない可能性があります。手順2を確認してください。

### エラー: "relation public.profiles does not exist"
→ データベーススキーマが適用されていません。手順1を実行してください。

### 認証後にエラーが出る
→ Supabase の Authentication → URL Configuration を確認:
- Site URL: 本番URLを設定
- Redirect URLs: 本番URLと http://localhost:3001 を追加

### デプロイは成功するが機能しない
→ Vercelの環境変数設定後、必ず「Redeploy」を実行してください。

---

## 🚀 現在の状態

✅ **コードはGitHubにプッシュ済み**
- リポジトリ: https://github.com/maruyama-atsuo/cursor_test

✅ **Vercelが自動デプロイ中**
- ダッシュボード: https://vercel.com/dashboard

⚠️ **データベーススキーマの適用が必要**
⚠️ **Vercel環境変数の設定が必要**

上記2つを完了すれば、すぐに使用可能になります！
