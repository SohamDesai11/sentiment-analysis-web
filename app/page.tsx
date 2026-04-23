"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ResultCard from "../components/TempCard";
import ReviewForm from "../components/TempForm";
import HistoryList from "../components/HistoryList";

type HistoryItem = {
  id: number;
  review: string;
  sentiment: string;
  confidence: string;
  timestamp: string;
};

export default function Home() {
  const [result, setResult] = useState<{ sentiment?: string; confidence?: string; error?: string } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  function handleResult(data: { sentiment?: string; confidence?: string; error?: string }, review?: string) {
    setResult(data);

    if (!data.error && data.sentiment && data.confidence && review) {
      const newItem: HistoryItem = {
        id: Date.now(),
        review,
        sentiment: data.sentiment,
        confidence: data.confidence,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Keep only the last 10 items, newest first
      setHistory((prev) => [newItem, ...prev].slice(0, 10));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Sentiment Analysis App
            </h1>
            <p className="text-gray-600 text-lg">
              Enter a product review and let AI analyze the sentiment instantly.
            </p>
          </div>

          <ReviewForm onResult={handleResult} />

          {result ? (
            result.error ? (
              <div className="bg-red-100 rounded-xl p-6 mt-8">
                <h2 className="text-xl font-semibold text-red-800 mb-3">
                  Error
                </h2>
                <p className="text-red-700">{result.error}</p>
              </div>
            ) : (
              <ResultCard sentiment={result.sentiment!} confidence={result.confidence!} />
            )
          ) : null}

          <HistoryList history={history} onClear={() => setHistory([])} />
        </div>
      </main>
    </div>
  );
}
