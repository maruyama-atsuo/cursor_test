-- テストアカウント作成スクリプト
-- Supabase SQL Editorで実行してください

-- 既存のテストユーザーを削除（存在する場合）
DELETE FROM auth.users WHERE email = 'test@example.com';

-- テストユーザーを作成
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  last_sign_in_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@example.com',
  crypt('Test123456!', gen_salt('bf')), -- パスワード: Test123456!
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"テストユーザー"}'::jsonb,
  FALSE,
  NOW()
);

-- 確認: 作成されたユーザーを表示
SELECT
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'test@example.com';
