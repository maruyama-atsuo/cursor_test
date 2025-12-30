// 型定義

export interface QuestionOption {
  id: string;
  text: string;
  scores: {
    L?: number;
    C?: number;
    T?: number;
    S?: number;
    I?: number;
    Co?: number;
    R?: number;
    B?: number;
  };
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export interface Career {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  skills: string[];
  traits: string[];
  careerPath: string;
  relatedCareers: string[];
  icon: string;
  color: string;
}

export interface Answer {
  questionId: number;
  selectedOptionId: string;
}

export interface QuizState {
  answers: Answer[];
  currentQuestion: number;
}

export interface AxisScores {
  'L-C': number; // 正: L, 負: C
  'T-S': number; // 正: T, 負: S
  'I-C': number; // 正: I, 負: Co
  'R-B': number; // 正: R, 負: B
}

export interface DiagnosisResult {
  careerId: string;
  scores: AxisScores;
}
