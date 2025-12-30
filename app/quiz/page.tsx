'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { questions } from '@/data/questions';
import { Answer } from '@/lib/types';
import { calculateResult } from '@/lib/quiz-logic';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        selectedOptionId: selectedOption,
      },
    ];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const result = calculateResult(newAnswers);
      router.push(`/result/${result.careerId}`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers.find(
        (a) => a.questionId === questions[currentQuestionIndex - 1].id
      );
      setSelectedOption(previousAnswer?.selectedOptionId || null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ヘッダー */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-lg font-bold text-gray-900">AI Career Navigator</span>
            </Link>
            <Link href="/">
              <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                中止する
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {/* タイトルセクション */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            AI職業診断
          </h1>
          <p className="text-gray-600">
            あなたに最適なAIキャリアを見つけましょう
          </p>
        </div>

        {/* プログレスバー */}
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        {/* 質問カード */}
        <QuestionCard
          question={currentQuestion}
          selectedOption={selectedOption}
          onSelect={handleSelectOption}
        />

        {/* ナビゲーションボタン */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className={`btn-secondary flex-1 ${
              currentQuestionIndex === 0
                ? 'opacity-40 cursor-not-allowed'
                : ''
            }`}
          >
            ← 戻る
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`btn-primary flex-1 ${
              !selectedOption ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            {isLastQuestion ? '結果を見る →' : '次へ →'}
          </button>
        </div>

        {/* ヒント */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            💡 直感で答えると、より正確な結果が得られます
          </p>
        </div>
      </div>
    </div>
  );
}
