# Supabase Database Setup

## データベーススキーマのセットアップ手順

1. Supabaseダッシュボードにログイン
2. プロジェクト `yqwirzwmtnrmwrkoelmg` を選択
3. 左サイドバーから「SQL Editor」を選択
4. 「New query」をクリック
5. `schema.sql` ファイルの内容をコピー&ペースト
6. 「Run」ボタンをクリックして実行

## 作成されるテーブル

### profiles
- ユーザープロフィール情報
- auth.users テーブルと連携

### quiz_results
- 診断結果の保存
- スコアと回答の履歴

### favorites
- お気に入りキャリアの保存

### learning_progress
- 学習進捗の追跡
- スキルごとの進捗率

## Row Level Security (RLS)

すべてのテーブルでRLSが有効化されており、ユーザーは自分のデータのみアクセス可能です。

## 認証プロバイダーの設定

Supabaseダッシュボードで以下のプロバイダーを有効化してください:

1. Authentication > Providers に移動
2. 以下を有効化:
   - Email (デフォルトで有効)
   - Google OAuth
   - GitHub OAuth

### Google OAuth 設定
1. Google Cloud Console でプロジェクト作成
2. OAuth 2.0 クライアント ID を作成
3. リダイレクトURI: `https://yqwirzwmtnrmwrkoelmg.supabase.co/auth/v1/callback`
4. Client ID と Client Secret を Supabase に設定

### GitHub OAuth 設定
1. GitHub Settings > Developer settings > OAuth Apps
2. New OAuth App を作成
3. Authorization callback URL: `https://yqwirzwmtnrmwrkoelmg.supabase.co/auth/v1/callback`
4. Client ID と Client Secret を Supabase に設定
