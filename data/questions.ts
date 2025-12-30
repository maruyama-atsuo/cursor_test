// 診断質問データ

export interface QuestionOption {
  id: string;
  text: string;
  scores: {
    L?: number;  // Logical
    C?: number;  // Creative
    T?: number;  // Technical
    S?: number;  // Strategic
    I?: number;  // Independent
    Co?: number; // Collaborative
    R?: number;  // Research
    B?: number;  // Business
  };
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: '新しいAI技術を学ぶとき、あなたはどちらのアプローチを取りますか？',
    options: [
      {
        id: 'A',
        text: '論文や技術文書を読んで、理論的な仕組みを深く理解する',
        scores: { L: 3, R: 2 },
      },
      {
        id: 'B',
        text: 'とりあえず手を動かして、実際に試しながら学ぶ',
        scores: { C: 2, T: 3 },
      },
      {
        id: 'C',
        text: 'チュートリアルや成功事例を参考に、実用的な使い方を学ぶ',
        scores: { C: 2, B: 3 },
      },
      {
        id: 'D',
        text: '体系的に基礎から順序立てて、段階的に理解を深める',
        scores: { L: 3, S: 2 },
      },
    ],
  },
  {
    id: 2,
    question: 'AIプロジェクトで最もワクワクするフェーズはどれですか？',
    options: [
      {
        id: 'A',
        text: '問題定義とソリューション設計を考える段階',
        scores: { S: 3, L: 2 },
      },
      {
        id: 'B',
        text: 'モデルの実装やコーディングをする段階',
        scores: { T: 3, I: 2 },
      },
      {
        id: 'C',
        text: '実験や分析を繰り返して新しい発見をする段階',
        scores: { R: 3, L: 1 },
      },
      {
        id: 'D',
        text: '完成したものをユーザーに届けて反応を見る段階',
        scores: { B: 3, Co: 2 },
      },
    ],
  },
  {
    id: 3,
    question: '理想的な仕事環境は？',
    options: [
      {
        id: 'A',
        text: '静かな個室で、集中して深く考えられる環境',
        scores: { I: 3, R: 2 },
      },
      {
        id: 'B',
        text: 'チームメンバーとコミュニケーションを取りながら進める環境',
        scores: { Co: 3, B: 1 },
      },
      {
        id: 'C',
        text: '自分のペースで自由に作業できる環境',
        scores: { I: 3, C: 1 },
      },
      {
        id: 'D',
        text: '多様な人と関わり、刺激を受けられる環境',
        scores: { Co: 3, S: 1 },
      },
    ],
  },
  {
    id: 4,
    question: 'AIの可能性について、どちらに魅力を感じますか？',
    options: [
      {
        id: 'A',
        text: '未解明の問題に挑戦し、新しい知見を得ること',
        scores: { R: 3, L: 2 },
      },
      {
        id: 'B',
        text: '現実の課題を解決し、社会に価値を提供すること',
        scores: { B: 3, S: 2 },
      },
      {
        id: 'C',
        text: '人々の創造性を拡張し、新しい表現を生み出すこと',
        scores: { C: 3, B: 2 },
      },
      {
        id: 'D',
        text: '技術の限界に挑戦し、性能を極限まで引き出すこと',
        scores: { T: 3, R: 2 },
      },
    ],
  },
  {
    id: 5,
    question: 'プロジェクトで困難に直面したとき、どう対処しますか？',
    options: [
      {
        id: 'A',
        text: 'データや事実を分析して、論理的に原因を特定する',
        scores: { L: 3, T: 2 },
      },
      {
        id: 'B',
        text: 'いろいろな角度から試行錯誤して、解決策を探る',
        scores: { C: 3, T: 1 },
      },
      {
        id: 'C',
        text: 'チームで議論して、多様な視点から解決策を見つける',
        scores: { Co: 3, S: 1 },
      },
      {
        id: 'D',
        text: '専門家に相談したり、文献を調べて知見を得る',
        scores: { L: 2, R: 3 },
      },
    ],
  },
  {
    id: 6,
    question: 'AIを使ったプロジェクトで重視することは？',
    options: [
      {
        id: 'A',
        text: '技術的な新規性や先進性',
        scores: { R: 3, T: 2 },
      },
      {
        id: 'B',
        text: 'ビジネス的なインパクトや収益性',
        scores: { B: 3, S: 2 },
      },
      {
        id: 'C',
        text: 'ユーザー体験やデザインの美しさ',
        scores: { C: 3, B: 1 },
      },
      {
        id: 'D',
        text: 'システムの堅牢性や完成度',
        scores: { L: 3, T: 2 },
      },
    ],
  },
  {
    id: 7,
    question: '日々の業務で得意なことは？',
    options: [
      {
        id: 'A',
        text: 'コードを書いて、実際に動くものを作ること',
        scores: { T: 3, I: 2 },
      },
      {
        id: 'B',
        text: '全体像を描いて、戦略やロードマップを立てること',
        scores: { S: 3, L: 2 },
      },
      {
        id: 'C',
        text: 'アイデアを出して、新しいコンセプトを考えること',
        scores: { C: 3, R: 1 },
      },
      {
        id: 'D',
        text: '人をまとめて、プロジェクトを前に進めること',
        scores: { Co: 3, B: 2 },
      },
    ],
  },
  {
    id: 8,
    question: 'AIについて学び続ける動機は？',
    options: [
      {
        id: 'A',
        text: '知的好奇心を満たし、未知の領域を探求したい',
        scores: { R: 3, L: 1 },
      },
      {
        id: 'B',
        text: 'キャリアアップや市場価値を高めたい',
        scores: { B: 3, S: 1 },
      },
      {
        id: 'C',
        text: '面白いものを作って、人を驚かせたい',
        scores: { C: 3, B: 2 },
      },
      {
        id: 'D',
        text: '最先端の技術をマスターして、専門性を高めたい',
        scores: { T: 3, R: 2 },
      },
    ],
  },
  {
    id: 9,
    question: 'チームでのあなたの役割は？',
    options: [
      {
        id: 'A',
        text: '技術的な課題を解決する実装担当',
        scores: { T: 3, I: 2 },
      },
      {
        id: 'B',
        text: '方向性を示し、意思決定をリードする役割',
        scores: { S: 3, Co: 2 },
      },
      {
        id: 'C',
        text: '調査や分析をして、データに基づく提案をする役割',
        scores: { L: 3, R: 2 },
      },
      {
        id: 'D',
        text: 'アイデアを出して、チームを盛り上げる役割',
        scores: { C: 3, Co: 2 },
      },
    ],
  },
  {
    id: 10,
    question: '5年後、AIに関わる仕事でどうなっていたいですか？',
    options: [
      {
        id: 'A',
        text: '学術論文を発表したり、研究者として認められている',
        scores: { R: 3, I: 2 },
      },
      {
        id: 'B',
        text: '自分が作ったAIプロダクトが多くの人に使われている',
        scores: { B: 3, T: 2 },
      },
      {
        id: 'C',
        text: 'AIを活用した革新的なサービスを企画・設計している',
        scores: { S: 3, B: 2 },
      },
      {
        id: 'D',
        text: 'AI技術を使って、芸術的・創造的な作品を生み出している',
        scores: { C: 3, I: 2 },
      },
    ],
  },
];
