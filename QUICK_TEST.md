# 🚀 すぐにテストする方法

## ステップ1: テストアカウント作成（1分）

### 方法A: Webから登録（超簡単！）

1. **ブラウザでアクセス**:
   ```
   http://localhost:3001/signup
   ```

2. **情報を入力**:
   - お名前: `テストユーザー`
   - メールアドレス: `test@example.com`
   - パスワード: `Test123456!`
   - パスワード（確認）: `Test123456!`

3. **「メールで登録」をクリック**

4. **完了！** 自動的にログインされます

---

### 方法B: Supabaseから作成（推奨）

**手順**:

1. **Supabaseを開く**:
   ```
   https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg/auth/users
   ```

2. **「Add user」→「Create new user」をクリック**

3. **情報を入力**:
   - Email: `test@example.com`
   - Password: `Test123456!`
   - ✅ **Auto Confirm User** にチェック（重要！）

4. **「Create user」をクリック**

5. **完了！** すぐにログイン可能

---

## ステップ2: ログイン

1. **ログインページを開く**:
   ```
   http://localhost:3001/login
   ```

2. **ログイン情報を入力**:
   ```
   Email: test@example.com
   Password: Test123456!
   ```

3. **「メールでログイン」をクリック**

---

## ステップ3: 診断を受ける

1. **診断ページへ**:
   ```
   http://localhost:3001/quiz
   ```
   または、トップページから「診断を始める」をクリック

2. **10問の質問に答える**

3. **結果が表示される**
   - 自動的にデータベースに保存されます

---

## ステップ4: メール送信テスト

1. **結果ページで「📧 メールで送信」ボタンをクリック**

2. **確認ダイアログが表示される**:
   ```
   メールを送信しました（テストモード）

   送信されたメールをプレビューで確認しますか？
   ```

3. **「OK」をクリック**

4. **ブラウザで美しいメールが表示される！**
   - Ethereal Email のプレビューページが開きます
   - 実際に送信されるメールと同じデザインが確認できます

---

## 📧 メール送信の仕組み

### 開発環境（現在）

**Ethereal Email** を使用（テスト用メールサービス）:
- ✅ 実際にメールサーバーに送信される
- ✅ 美しいHTMLメールが生成される
- ✅ プレビューURLでメール内容を確認できる
- ✅ 実際の受信者には届かない（安全）

### 本番環境（将来）

環境変数を設定することで実際のメールサービスを使用:

**.env.local に追加**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="AI Career Navigator <noreply@example.com>"
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**対応メールサービス**:
- Gmail（App Passwordが必要）
- SendGrid
- Amazon SES
- Mailgun
- その他のSMTPサーバー

---

## 🧪 テストフロー全体

### 1回目の診断
```
ログイン → 診断 → 結果表示 → メール送信 → プレビュー確認
```

### 2回目の診断（異なる結果を試す）
```
診断 → 違う答えを選択 → 別の結果 → メール送信
```

### マイページで確認
```
マイページ → 診断履歴 → 2つの結果が表示される
```

---

## 📊 データベース確認

### Table Editorで確認

1. **Supabaseを開く**:
   ```
   https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg/editor
   ```

2. **テーブルを選択**:
   - **profiles**: ユーザー情報（test@example.com が表示される）
   - **quiz_results**: 診断結果（careerId、scores が保存される）

3. **データを見る**:
   - 作成したテストユーザーのデータが確認できます
   - スコアの詳細（JSON形式）が確認できます

---

## ✅ 確認ポイント

### 動作確認チェックリスト

- [ ] アカウント作成できた
- [ ] ログインできた
- [ ] 診断を受けられた
- [ ] 結果が表示された
- [ ] 「メールで送信」ボタンが表示された
- [ ] メール送信が成功した
- [ ] プレビューで美しいメールが確認できた
- [ ] マイページで診断結果が表示された
- [ ] 診断履歴ページで詳細が見れた
- [ ] お気に入り機能が動作した

---

## 🔧 トラブルシューティング

### メール送信ボタンが表示されない
→ ログインしているか確認してください

### 「送信中...」のまま固まる
→ ブラウザの開発者ツール（F12）→ Console でエラー確認

### プレビューが表示されない
→ ポップアップブロッカーを無効にしてください

### データベースが空
→ データベーススキーマ（schema.sql）を実行しましたか？

---

## 🎯 今すぐ試す！

**最短ルート**:

1. Supabaseでテストユーザー作成（1分）
   → https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg/auth/users

2. ログイン
   → http://localhost:3001/login

3. 診断
   → http://localhost:3001/quiz

4. メール送信テスト
   → 結果ページで「📧 メールで送信」

---

**所要時間**: 合計 5分

簡単ですね！🚀
