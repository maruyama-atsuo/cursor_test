import { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

export default function QuestionCard({
  question,
  selectedOption,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="card-glass p-8 md:p-10 space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300 border-2 ${
              selectedOption === option.id
                ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 border-purple-400 scale-[1.02]'
                : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOption === option.id
                    ? 'border-purple-400 bg-purple-500'
                    : 'border-white/40'
                }`}
              >
                {selectedOption === option.id && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="flex-1 text-gray-100 font-medium">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
