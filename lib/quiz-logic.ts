import { Answer, AxisScores, DiagnosisResult, QuestionOption } from './types';
import { questions } from '@/data/questions';

/**
 * 回答から診断結果を計算する
 */
export function calculateResult(answers: Answer[]): DiagnosisResult {
  const scores: AxisScores = {
    'L-C': 0,
    'T-S': 0,
    'I-C': 0,
    'R-B': 0,
  };

  // 各回答のスコアを集計
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find((opt) => opt.id === answer.selectedOptionId);
    if (!option) return;

    // 各軸のスコアを計算
    const optScores = option.scores;

    // L-C軸: Lは正、Cは負
    if (optScores.L) scores['L-C'] += optScores.L;
    if (optScores.C) scores['L-C'] -= optScores.C;

    // T-S軸: Tは正、Sは負
    if (optScores.T) scores['T-S'] += optScores.T;
    if (optScores.S) scores['T-S'] -= optScores.S;

    // I-C軸: Iは正、Coは負
    if (optScores.I) scores['I-C'] += optScores.I;
    if (optScores.Co) scores['I-C'] -= optScores.Co;

    // R-B軸: Rは正、Bは負
    if (optScores.R) scores['R-B'] += optScores.R;
    if (optScores.B) scores['R-B'] -= optScores.B;
  });

  // スコアから職業IDを決定
  const careerId = determineCareerType(scores);

  return {
    careerId,
    scores,
  };
}

/**
 * スコアから職業タイプを決定
 */
function determineCareerType(scores: AxisScores): string {
  let type = '';

  // L-C軸: 正ならL、負ならC
  type += scores['L-C'] >= 0 ? 'L' : 'C';

  // T-S軸: 正ならT、負ならS
  type += scores['T-S'] >= 0 ? 'T' : 'S';

  // I-C軸: 正ならI、負ならC
  type += scores['I-C'] >= 0 ? 'I' : 'C';

  // R-B軸: 正ならR、負ならB
  type += scores['R-B'] >= 0 ? 'R' : 'B';

  return type;
}

/**
 * 進捗率を計算
 */
export function calculateProgress(currentQuestion: number, totalQuestions: number): number {
  return Math.round((currentQuestion / totalQuestions) * 100);
}

/**
 * 全ての質問に回答済みかチェック
 */
export function isQuizComplete(answers: Answer[], totalQuestions: number): boolean {
  return answers.length === totalQuestions;
}
