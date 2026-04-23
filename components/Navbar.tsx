import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-800">
          AI Sentiment Analyzer
        </h1>
        <div className="space-x-6 text-gray-700 font-medium">
        </div>
      </div>
    </nav>
  );
}
