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
  scores: {
    'L-C': number;
    'T-S': number;
    'I-C': number;
    'R-B': number;
  };
  created_at: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadResults();
    }
  }, [user]);

  const loadResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setQuizResults(data);
      }
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResult = async (id: string) => {
    if (!confirm('この診断結果を削除しますか?')) return;

    try {
      const { error } = await supabase
        .from('quiz_results')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from local state
      setQuizResults(quizResults.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('削除に失敗しました');
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
            <Link href="/dashboard">
              <button className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                マイページ
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ヘッダー */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">診断履歴</h1>
          <p className="text-gray-600">
            これまでの診断結果を一覧で確認できます
          </p>
        </div>

        {/* 統計カード */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {quizResults.length}
                </div>
                <div className="text-sm text-gray-600">診断回数</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </div>

          <div className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {new Set(quizResults.map((r) => r.career_id)).size}
                </div>
                <div className="text-sm text-gray-600">異なる結果</div>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
            </div>
          </div>

          <div className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {quizResults.length > 0
                    ? new Date(quizResults[0].created_at).toLocaleDateString('ja-JP', {
                        month: 'long',
                        day: 'numeric',
                      })
                    : '-'}
                </div>
                <div className="text-sm text-gray-600">最新診断日</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* 結果リスト */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">読み込み中...</div>
        ) : quizResults.length > 0 ? (
          <div className="space-y-4">
            {quizResults.map((result, index) => {
              const career = careers.find((c) => c.id === result.career_id);
              if (!career) return null;

              return (
                <div key={result.id} className="card-elevated p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-6">
                    {/* 番号 */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-gray-600">#{quizResults.length - index}</span>
                    </div>

                    {/* アイコンとタイトル */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-4xl">{career.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{career.name}</h3>
                          <p className="text-sm text-gray-500">{career.nameEn}</p>
                        </div>
                      </div>

                      {/* スコア表示 */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-xs text-gray-600 mb-1">Logical-Creative</div>
                          <div className="text-sm font-bold text-gray-900">
                            {result.scores['L-C'] > 0 ? 'L' : 'C'} {Math.abs(result.scores['L-C'])}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-xs text-gray-600 mb-1">Technical-Strategic</div>
                          <div className="text-sm font-bold text-gray-900">
                            {result.scores['T-S'] > 0 ? 'T' : 'S'} {Math.abs(result.scores['T-S'])}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-xs text-gray-600 mb-1">Independent-Collaborative</div>
                          <div className="text-sm font-bold text-gray-900">
                            {result.scores['I-C'] > 0 ? 'I' : 'C'} {Math.abs(result.scores['I-C'])}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-xs text-gray-600 mb-1">Research-Business</div>
                          <div className="text-sm font-bold text-gray-900">
                            {result.scores['R-B'] > 0 ? 'R' : 'B'} {Math.abs(result.scores['R-B'])}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* アクション */}
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <div className="text-sm text-gray-500 mb-2">
                        {new Date(result.created_at).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <Link href={`/result/${career.id}`}>
                        <button className="btn-primary text-sm py-2 px-4 w-full">
                          詳細を見る
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteResult(result.id)}
                        className="btn-secondary text-sm py-2 px-4"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
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
    </div>
  );
}
