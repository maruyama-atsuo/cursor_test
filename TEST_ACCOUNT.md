# テストアカウント作成ガイド

## 📝 テストアカウント情報（作成後に記入）

```
Email: test@example.com
Password: Test123456!
```

## 🔐 アカウント作成手順

### 方法1：Webページから登録（推奨）

1. **サインアップページを開く**
   ```
   http://localhost:3001/signup
   ```

2. **アカウント情報を入力**
   - お名前: テストユーザー
   - メールアドレス: test@example.com
   - パスワード: Test123456!
   - パスワード（確認）: Test123456!

3. **「メールで登録」をクリック**

4. **確認メールの処理**

   デフォルトでは確認メールが必要ですが、開発時は以下の設定で無効化できます：

   **Supabaseで確認メールを無効化（開発時のみ）**:
   ```
   https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg/auth/providers
   ```
   - 「Email」プロバイダーを選択
   - 「Confirm email」をOFFに設定
   - 「Save」をクリック

5. **ログインできるようになります**
   ```
   http://localhost:3001/login
   ```

---

### 方法2：Supabaseダッシュボードから直接作成

1. **Supabaseダッシュボードを開く**
   ```
   https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg/auth/users
   ```

2. **「Add user」ボタンをクリック**

3. **ユーザー情報を入力**
   - Email: test@example.com
   - Password: Test123456!
   - ✅ Auto Confirm User にチェック（確認メール不要）

4. **「Create user」をクリック**

5. **すぐにログイン可能**
   ```
   http://localhost:3001/login
   ```

---

## 🧪 テストフロー

### 1. ログイン
```
http://localhost:3001/login
```
- Email: test@example.com
- Password: Test123456!

### 2. 診断を受ける
```
http://localhost:3001/quiz
```
- 10問の質問に答える
- 結果が自動保存される

### 3. マイページで確認
```
http://localhost:3001/dashboard
```
- 診断結果が表示される
- 統計情報が見れる

### 4. 診断履歴を確認
```
http://localhost:3001/history
```
- 過去の診断結果一覧
- スコア詳細表示

### 5. お気に入り機能
- 結果ページで「お気に入りに追加」をクリック
- マイページにお気に入りが表示される

---

## 🔍 複数アカウントでのテスト

異なるユーザーでの動作を確認する場合：

**アカウント1（研究志向）**:
```
Email: researcher@test.com
Password: Test123456!
```

**アカウント2（ビジネス志向）**:
```
Email: business@test.com
Password: Test123456!
```

**アカウント3（クリエイティブ志向）**:
```
Email: creative@test.com
Password: Test123456!
```

それぞれで診断を受けて、異なる結果を保存できます。

---

## 🗑️ テストデータのクリーンアップ

テスト後にデータを削除する場合：

### 個別削除
1. Supabase Dashboard → Authentication → Users
2. テストユーザーを選択
3. 「Delete user」

### 一括削除（SQL）
```sql
-- すべてのテストユーザーを削除
DELETE FROM auth.users WHERE email LIKE '%@test.com';

-- 特定のユーザーのデータのみ削除
DELETE FROM public.quiz_results WHERE user_id = 'ユーザーID';
DELETE FROM public.favorites WHERE user_id = 'ユーザーID';
```

---

## ⚠️ トラブルシューティング

### ログインできない
1. Supabase Dashboard → Authentication → Users でユーザーが存在するか確認
2. 「Email Confirmed」が✅になっているか確認
3. パスワードをリセット

### 診断結果が保存されない
1. ブラウザの開発者ツール（F12）→ Console でエラー確認
2. Supabase Dashboard → Database → Tables で `quiz_results` テーブルの存在確認
3. RLSポリシーが正しく設定されているか確認

### データが表示されない
1. ログインしているユーザーIDを確認
2. Supabase Dashboard → Table Editor → quiz_results でデータ確認
3. user_id が一致しているか確認
