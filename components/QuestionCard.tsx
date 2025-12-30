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
    <div className="card-elevated p-8 md:p-12 space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full text-left p-5 md:p-6 rounded-2xl transition-all duration-300 border-2 ${
              selectedOption === option.id
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-lg scale-[1.02]'
                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOption === option.id
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}
              >
                {selectedOption === option.id && (
                  <svg
                    className="w-4 h-4 text-white"
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
              <span className={`flex-1 font-medium text-base md:text-lg ${
                selectedOption === option.id ? 'text-blue-900' : 'text-gray-700'
              }`}>
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
