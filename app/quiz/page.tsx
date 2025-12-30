'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

    // 回答を保存
    const newAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        selectedOptionId: selectedOption,
      },
    ];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // 診断結果を計算
      const result = calculateResult(newAnswers);
      // 結果ページに遷移
      router.push(`/result/${result.careerId}`);
    } else {
      // 次の質問へ
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // 前の質問の回答を復元
      const previousAnswer = answers.find(
        (a) => a.questionId === questions[currentQuestionIndex - 1].id
      );
      setSelectedOption(previousAnswer?.selectedOptionId || null);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            AI Career Navigator
          </h1>
          <p className="text-gray-300">あなたに合ったAI職業を診断</p>
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
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className={`btn-secondary flex-1 ${
              currentQuestionIndex === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            戻る
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`btn-primary flex-1 ${
              !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLastQuestion ? '結果を見る' : '次へ'}
          </button>
        </div>

        {/* キャンセルリンク */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
          >
            診断を中止する
          </button>
        </div>
      </div>
    </div>
  );
}
