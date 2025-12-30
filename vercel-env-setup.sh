#!/bin/bash

# Vercel環境変数設定スクリプト
# 注意: このスクリプトは手動確認が必要なため、参考として使用してください

echo "Vercel環境変数を設定します..."

# Supabase URL
echo "https://yqwirzwmtnrmwrkoelmg.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Supabase Anon Key
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxd2lyend3dG5ybXdya29lbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTI4MTAsImV4cCI6MjA1MTEyODgxMH0.sb_publishable_BlC67D3t1LIglCK067BMdQ_B9cPeRvK" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

echo "Preview環境に設定..."
echo "https://yqwirzwmtnrmwrkoelmg.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL preview

echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxd2lyend3dG5ybXdya29lbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTI4MTAsImV4cCI6MjA1MTEyODgxMH0.sb_publishable_BlC67D3t1LIglCK067BMdQ_B9cPeRvK" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview

echo "Development環境に設定..."
echo "https://yqwirzwmtnrmwrkoelmg.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL development

echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxd2lyend3dG5ybXdya29lbG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTI4MTAsImV4cCI6MjA1MTEyODgxMH0.sb_publishable_BlC67D3t1LIglCK067BMdQ_B9cPeRvK" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development

echo "完了！Vercelダッシュボードで確認してください。"
echo "https://vercel.com/dashboard"
