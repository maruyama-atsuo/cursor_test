# 📊 データベース確認ガイド

Supabaseでデータを確認・管理する方法をまとめました。

---

## 🔗 アクセス方法

### Supabaseダッシュボード
```
https://supabase.com/dashboard/project/yqwirzwmtnrmwrkoelmg
```

---

## 📋 テーブル一覧と確認方法

### 1. ユーザープロフィール（profiles）

**アクセス**: Database → Tables → profiles

**確認できるデータ**:
- ユーザーID
- メールアドレス
- 名前
- アバターURL
- 作成日・更新日

**SQLで確認**:
```sql
-- 全ユーザーを表示
SELECT * FROM public.profiles;

-- ユーザー数を確認
SELECT COUNT(*) FROM public.profiles;
```

---

### 2. 診断結果（quiz_results）

**アクセス**: Database → Tables → quiz_results

**確認できるデータ**:
- 結果ID
- ユーザーID
- 職業ID（LTIR、CTCBなど）
- スコア（4軸のスコア）
- 回答内容
- 診断日時

**SQLで確認**:
```sql
-- 全診断結果を表示
SELECT * FROM public.quiz_results ORDER BY created_at DESC;

-- ユーザーごとの診断回数
SELECT user_id, COUNT(*) as quiz_count
FROM public.quiz_results
GROUP BY user_id;

-- 最新10件の診断結果
SELECT
  qr.id,
  p.email,
  qr.career_id,
  qr.created_at
FROM public.quiz_results qr
JOIN public.profiles p ON p.id = qr.user_id
ORDER BY qr.created_at DESC
LIMIT 10;

-- 職業タイプ別の人数
SELECT
  career_id,
  COUNT(*) as count
FROM public.quiz_results
GROUP BY career_id
ORDER BY count DESC;
```

---

### 3. お気に入り（favorites）

**アクセス**: Database → Tables → favorites

**確認できるデータ**:
- お気に入りID
- ユーザーID
- 職業ID
- 追加日時

**SQLで確認**:
```sql
-- 全お気に入りを表示
SELECT * FROM public.favorites;

-- ユーザーごとのお気に入り数
SELECT user_id, COUNT(*) as favorite_count
FROM public.favorites
GROUP BY user_id;

-- 人気の職業ランキング
SELECT
  career_id,
  COUNT(*) as favorite_count
FROM public.favorites
GROUP BY career_id
ORDER BY favorite_count DESC;

-- 特定ユーザーのお気に入り
SELECT
  f.career_id,
  f.created_at,
  p.email
FROM public.favorites f
JOIN public.profiles p ON p.id = f.user_id
WHERE f.user_id = 'ユーザーIDを入力';
```

---

### 4. 学習進捗（learning_progress）

**アクセス**: Database → Tables → learning_progress

**確認できるデータ**:
- 進捗ID
- ユーザーID
- 職業ID
- スキル名
- 進捗率（0-100%）
- メモ
- 作成日・更新日

**SQLで確認**:
```sql
-- 全学習進捗を表示
SELECT * FROM public.learning_progress;

-- ユーザーごとの平均進捗率
SELECT
  user_id,
  AVG(progress_percentage) as avg_progress
FROM public.learning_progress
GROUP BY user_id;
```

---

## 🔍 便利なクエリ集

### ユーザー統計

```sql
-- ユーザー登録数（日別）
SELECT
  DATE(created_at) as date,
  COUNT(*) as user_count
FROM public.profiles
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- アクティブユーザー（診断を受けたユーザー）
SELECT COUNT(DISTINCT user_id) as active_users
FROM public.quiz_results;
```

---

### 診断統計

```sql
-- 診断数の推移（日別）
SELECT
  DATE(created_at) as date,
  COUNT(*) as quiz_count
FROM public.quiz_results
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 最も多い診断結果トップ5
SELECT
  career_id,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM public.quiz_results), 2) as percentage
FROM public.quiz_results
GROUP BY career_id
ORDER BY count DESC
LIMIT 5;

-- 特定の職業タイプの診断結果を見る
SELECT
  qr.*,
  p.email,
  p.full_name
FROM public.quiz_results qr
JOIN public.profiles p ON p.id = qr.user_id
WHERE qr.career_id = 'LTIR'  -- AIリサーチサイエンティスト
ORDER BY qr.created_at DESC;
```

---

### スコア分析

```sql
-- 各軸の平均スコア
SELECT
  AVG((scores->>'L-C')::numeric) as avg_lc,
  AVG((scores->>'T-S')::numeric) as avg_ts,
  AVG((scores->>'I-C')::numeric) as avg_ic,
  AVG((scores->>'R-B')::numeric) as avg_rb
FROM public.quiz_results;

-- Logical vs Creative の分布
SELECT
  CASE
    WHEN (scores->>'L-C')::numeric > 0 THEN 'Logical'
    WHEN (scores->>'L-C')::numeric < 0 THEN 'Creative'
    ELSE 'Neutral'
  END as lc_type,
  COUNT(*) as count
FROM public.quiz_results
GROUP BY lc_type;
```

---

## 🗂️ Table Editor での確認

### 使い方

1. **Table Editor を開く**
   ```
   Dashboard → Table Editor
   ```

2. **テーブルを選択**
   - 左サイドバーから確認したいテーブルをクリック

3. **データを確認・編集**
   - 各行をクリックして詳細表示
   - ✏️ アイコンで編集
   - 🗑️ アイコンで削除
   - 「Insert row」で新規追加

4. **フィルタリング**
   - 列名の横のフィルターアイコンをクリック
   - 条件を指定してデータを絞り込み

5. **検索**
   - 上部の検索ボックスで全文検索

---

## 📊 リアルタイムデータ監視

### Database → Logs

**確認できる情報**:
- SQL クエリの実行ログ
- エラーログ
- パフォーマンス情報

**使い方**:
1. Dashboard → Logs → Postgres Logs
2. リアルタイムでクエリ実行を監視
3. 遅いクエリを特定

---

## 🔐 ユーザー管理

### Authentication → Users

**確認できる情報**:
- 全ユーザーリスト
- 最終ログイン日時
- メール確認状態
- プロバイダー（Email/Google/GitHub）

**操作**:
- ユーザーの削除
- パスワードリセット
- メール確認状態の変更
- メタデータの編集

---

## 📈 便利な分析クエリ

### ユーザーエンゲージメント

```sql
-- ユーザーごとの診断回数（上位10名）
SELECT
  p.email,
  p.full_name,
  COUNT(qr.id) as quiz_count,
  MAX(qr.created_at) as last_quiz_date
FROM public.profiles p
LEFT JOIN public.quiz_results qr ON qr.user_id = p.id
GROUP BY p.id, p.email, p.full_name
ORDER BY quiz_count DESC
LIMIT 10;

-- 診断を受けたが最近活動していないユーザー
SELECT
  p.email,
  MAX(qr.created_at) as last_activity,
  COUNT(qr.id) as total_quizzes
FROM public.profiles p
JOIN public.quiz_results qr ON qr.user_id = p.id
GROUP BY p.id, p.email
HAVING MAX(qr.created_at) < NOW() - INTERVAL '7 days'
ORDER BY last_activity DESC;
```

---

### 職業タイプ分析

```sql
-- 各職業タイプの詳細統計
SELECT
  career_id,
  COUNT(*) as total_count,
  COUNT(DISTINCT user_id) as unique_users,
  MIN(created_at) as first_diagnosis,
  MAX(created_at) as last_diagnosis
FROM public.quiz_results
GROUP BY career_id
ORDER BY total_count DESC;

-- ユーザーが受けた異なる職業タイプ数
SELECT
  user_id,
  COUNT(DISTINCT career_id) as different_careers,
  COUNT(*) as total_quizzes
FROM public.quiz_results
GROUP BY user_id
HAVING COUNT(DISTINCT career_id) > 1
ORDER BY different_careers DESC;
```

---

## 🛠️ データメンテナンス

### 古いデータの削除

```sql
-- 30日以上前の診断結果を削除
DELETE FROM public.quiz_results
WHERE created_at < NOW() - INTERVAL '30 days';

-- 特定ユーザーのデータを全削除
DELETE FROM public.quiz_results WHERE user_id = 'ユーザーID';
DELETE FROM public.favorites WHERE user_id = 'ユーザーID';
DELETE FROM public.learning_progress WHERE user_id = 'ユーザーID';
DELETE FROM public.profiles WHERE id = 'ユーザーID';
```

### データのバックアップ

```sql
-- CSVエクスポート用クエリ
SELECT
  qr.id,
  p.email,
  qr.career_id,
  qr.scores,
  qr.created_at
FROM public.quiz_results qr
JOIN public.profiles p ON p.id = qr.user_id
ORDER BY qr.created_at DESC;
```

SQL Editorで実行後、結果を「Download CSV」でエクスポート可能

---

## 💡 Tips

### 1. JSON データの操作

スコアはJSON形式で保存されています：

```sql
-- JSON内の特定の値を取得
SELECT
  id,
  career_id,
  scores->>'L-C' as logical_creative_score,
  scores->>'T-S' as technical_strategic_score
FROM public.quiz_results;

-- JSON内の値で絞り込み
SELECT * FROM public.quiz_results
WHERE (scores->>'L-C')::numeric > 5;
```

### 2. 日付フィルタリング

```sql
-- 今日の診断
SELECT * FROM public.quiz_results
WHERE DATE(created_at) = CURRENT_DATE;

-- 今週の診断
SELECT * FROM public.quiz_results
WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE);

-- 今月の診断
SELECT * FROM public.quiz_results
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE);
```

### 3. パフォーマンス確認

```sql
-- テーブルのサイズ確認
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

データベースの確認方法は以上です！
何か問題があれば、エラーメッセージを確認して対処してください。
