"use client";

import { useState } from "react";

type ReviewFormProps = {
  onResult: (data: { sentiment?: string; confidence?: string; error?: string }, review: string) => void;
};

export default function ReviewForm({ onResult }: ReviewFormProps) {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!review.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        onResult({ error: data.error || "Failed to analyze sentiment." }, review);
      } else {
        onResult({ sentiment: data.sentiment, confidence: data.confidence }, review);
      }
    } catch (err) {
      console.error(err);
      onResult({ error: "Network error. Please try again." }, review);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <textarea
        rows={8}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Enter your review..."
        className="text-gray-700 w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
    </div>
  );
}