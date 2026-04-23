"use client";

type HistoryItem = {
  id: number;
  review: string;
  sentiment: string;
  confidence: string;
  timestamp: string;
};

type HistoryListProps = {
  history: HistoryItem[];
  onClear: () => void;
};

export default function HistoryList({ history, onClear }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Analysis History
        </h2>
        <button
          onClick={onClear}
          className="text-sm text-gray-400 hover:text-red-500 transition font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-3">
        {history.map((item) => {
          const isPositive = item.sentiment === "Positive";
          const badgeBg = isPositive
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-red-100 text-red-700 border border-red-200";
          const barColor = isPositive ? "bg-green-500" : "bg-red-500";

          return (
            <div
              key={item.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2 hover:shadow-sm transition"
            >
              {/* Top row: review text + badge */}
              <div className="flex justify-between items-start gap-4">
                <p className="text-gray-700 text-sm line-clamp-2 flex-1">
                  {item.review}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${badgeBg}`}
                >
                  {isPositive ? "😊" : "😞"} {item.sentiment}
                </span>
              </div>

              {/* Confidence bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${barColor}`}
                    style={{ width: item.confidence }}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium w-12 text-right">
                  {item.confidence}
                </span>
              </div>

              {/* Timestamp */}
              <p className="text-xs text-gray-400">{item.timestamp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
