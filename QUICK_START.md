# 🚀 クイックスタートガイド

## 開発サーバーが起動中です！

**アクセスURL:** http://localhost:3001

---

## ⚡ すぐにできること（ローカル環境）

### 1. ホームページを開く
```
http://localhost:3001
```
- トップページは既に動作します
- 診断も受けられます（ただし結果は保存されません）

### 2. 各ページを確認
- トップ: http://localhost:3001
- 職業一覧: http://localhost:3001/careers
- 診断: http://localhost:3001/quiz
- ログイン: http://localhost:3001/login
- サインアップ: http://localhost:3001/signup

---

## ⚠️ 注意: データベース機能を使うには

ログイン、診断結果の保存、履歴表示などのデータベース機能を使うには、
**Supabaseのデータベーススキーマを適用する必要があります。**

---

## 📝 3分でできる！データベースセットアップ

### ステップ1: Supabaseダッシュボードを開く
https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg

### ステップ2: SQL Editorを開く
左サイドバー → 「SQL Editor」 → 「New query」

### ステップ3: SQLをコピー&ペースト

以下のボタンでファイルを開いてコピーしてください:
```
supabase/schema.sql
```

または、VSCode/Cursorで:
1. `supabase/schema.sql` を開く
2. 全選択 (Ctrl+A / Cmd+A)
3. コピー (Ctrl+C / Cmd+C)
4. Supabase SQL Editorにペースト
5. 「Run」ボタンをクリック

### ステップ4: 完了確認
- エラーが出なければ成功！
- Database → Tables で4つのテーブルが表示されるはず:
  - profiles
  - quiz_results
  - favorites
  - learning_progress

---

## ✅ セットアップ完了後の確認

### 1. ローカルで確認
```
http://localhost:3001/signup
```
1. 新規アカウント作成
2. 診断を受ける
3. マイページで履歴を確認

### 2. 本番環境の設定

#### Vercel環境変数を追加
https://vercel.com/dashboard

Settings → Environment Variables → Add

**追加する環境変数:**
```
NEXT_PUBLIC_SUPABASE_URL=https://yqwirzwmtnrmwrkoelmg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxd2lyend3dG5ybXdya29lbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTI4MTAsImV4cCI6MjA1MTEyODgxMH0.sb_publishable_BlC67D3t1LIglCK067BMdQ_B9cPeRvK
```

#### 再デプロイ
Deployments → 最新のデプロイ → Redeploy

---

## 🎯 動作する機能一覧

### ✅ 既に動作する機能（認証不要）
- ホームページ
- 職業一覧
- 職業詳細ページ
- 診断機能（結果は保存されない）

### ⚠️ データベース設定後に動作する機能
- ユーザー登録・ログイン
- 診断結果の自動保存
- マイページ（ダッシュボード）
- 診断履歴の表示
- お気に入り機能
- 統計情報

---

## 📚 詳細ドキュメント

- セットアップ詳細: `SETUP_CHECKLIST.md`
- デプロイ手順: `DEPLOYMENT.md`
- Supabase設定: `supabase/README.md`

---

## 💡 次のステップ

1. ✅ データベーススキーマを適用
2. ✅ Vercel環境変数を設定
3. 🔧 OAuth設定（Google/GitHub）※任意
4. 🚀 本番環境でテスト
5. 🎉 ユーザーに公開！

---

開発サーバーは http://localhost:3001 で起動中です。
ブラウザで開いて確認してください！
