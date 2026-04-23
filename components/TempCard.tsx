"use client";

import { useEffect, useState } from "react";

type ResultCardProps = {
  sentiment: string;
  confidence: string;
};

export default function ResultCard({ sentiment, confidence }: ResultCardProps) {
  const [barWidth, setBarWidth] = useState(0);

  const confidenceNum = parseFloat(confidence); // e.g. 98.4

  const isPositive = sentiment === "Positive";

  const sentimentColor = isPositive ? "text-green-600" : "text-red-600";
  const barColor = isPositive
    ? "bg-gradient-to-r from-green-400 to-green-600"
    : "bg-gradient-to-r from-red-400 to-red-600";
  const badgeBg = isPositive
    ? "bg-green-100 text-green-700 border border-green-200"
    : "bg-red-100 text-red-700 border border-red-200";

  // Animate bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setBarWidth(confidenceNum), 100);
    return () => clearTimeout(timer);
  }, [confidenceNum]);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-8 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Analysis Result
      </h2>

      {/* Sentiment Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-gray-600 font-medium">Sentiment:</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${badgeBg}`}
        >
          {isPositive ? "😊" : "😞"} {sentiment}
        </span>
      </div>

      {/* Confidence Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 font-medium">Confidence Score</span>
          <span className={`font-bold text-lg ${sentimentColor}`}>
            {confidence}
          </span>
        </div>

        {/* Track */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          {/* Fill */}
          <div
            className={`h-4 rounded-full ${barColor} transition-all duration-1000 ease-out`}
            style={{ width: `${barWidth}%` }}
          />
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}