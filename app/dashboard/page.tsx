'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/lib/supabase/client';
import { careers } from '@/data/careers';

interface QuizResult {
  id: string;
  career_id: string;
  scores: any;
  created_at: string;
}

interface Favorite {
  id: string;
  career_id: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      // Load quiz results
      const { data: resultsData } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (resultsData) {
        setQuizResults(resultsData);
      }

      // Load favorites
      const { data: favoritesData } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (favoritesData) {
        setFavorites(favoritesData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ヘッダー */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-lg font-bold text-gray-900">AI Career Navigator</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ヘッダー */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">マイページ</h1>
          <p className="text-gray-600">
            {user.email} としてログイン中
          </p>
        </div>

        {/* クイックアクション */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/quiz">
            <div className="card-premium p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">新しい診断</h3>
                  <p className="text-sm text-gray-600">適性診断を受ける</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/careers">
            <div className="card-premium p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">職業一覧</h3>
                  <p className="text-sm text-gray-600">全職業を見る</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/history">
            <div className="card-premium p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">診断履歴</h3>
                  <p className="text-sm text-gray-600">過去の結果を見る</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 最近の診断結果 */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">最近の診断結果</h2>
            <Link href="/history" className="text-blue-600 hover:text-blue-700 font-semibold">
              すべて見る →
            </Link>
          </div>

          {loading ? (
            <div className="text-gray-500">読み込み中...</div>
          ) : quizResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizResults.map((result) => {
                const career = careers.find((c) => c.id === result.career_id);
                if (!career) return null;

                return (
                  <Link key={result.id} href={`/result/${career.id}`}>
                    <div className="card-premium p-6 hover:scale-105 transition-transform cursor-pointer">
                      <div className="text-center">
                        <div className="text-5xl mb-4">{career.icon}</div>
                        <h3 className="font-bold text-gray-900 mb-2">{career.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{career.nameEn}</p>
                        <div className="text-xs text-gray-500">
                          {new Date(result.created_at).toLocaleDateString('ja-JP')}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                まだ診断を受けていません
              </h3>
              <p className="text-gray-600 mb-6">
                あなたに最適なAI職業を見つけましょう
              </p>
              <Link href="/quiz">
                <button className="btn-primary">診断を始める</button>
              </Link>
            </div>
          )}
        </div>

        {/* お気に入り */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">お気に入りの職業</h2>

          {loading ? (
            <div className="text-gray-500">読み込み中...</div>
          ) : favorites.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((favorite) => {
                const career = careers.find((c) => c.id === favorite.career_id);
                if (!career) return null;

                return (
                  <Link key={favorite.id} href={`/result/${career.id}`}>
                    <div className="card-premium p-6 hover:scale-105 transition-transform cursor-pointer text-center">
                      <div className="text-5xl mb-4">{career.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-1 text-sm">{career.name}</h3>
                      <p className="text-xs text-gray-500">{career.nameEn}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                お気に入りがありません
              </h3>
              <p className="text-gray-600 mb-6">
                気になる職業を見つけたらお気に入りに追加しましょう
              </p>
              <Link href="/careers">
                <button className="btn-secondary">職業を見る</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
