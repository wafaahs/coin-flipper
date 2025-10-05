"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [side, setSide] = useState<string | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [counts, setCounts] = useState({ heads: 0, tails: 0 });
  const [darkMode, setDarkMode] = useState(false);

  const flipCoin = () => {
    if (flipping) return;
    setFlipping(true);
    setSide(null);

    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Heads" : "Tails";
      setSide(result);
      setCounts((prev) => ({
        ...prev,
        [result.toLowerCase()]: prev[result.toLowerCase()] + 1,
      }));
      setFlipping(false);
    }, 1000);
  };

  const resetCounts = () => {
    setCounts({ heads: 0, tails: 0 });
    setSide(null);
  };

  // Optional: Remember user’s theme preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">🪙 Coin Flipper</h1>

      <div className="relative w-40 h-40 mb-6">
        <motion.div
          animate={flipping ? { rotateY: 720 } : { rotateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full bg-yellow-400 rounded-full shadow-xl flex items-center justify-center text-2xl font-semibold text-gray-900"
        >
          {side ? side : "?"}
        </motion.div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={flipCoin}
          disabled={flipping}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            flipping
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          } text-white`}
        >
          {flipping ? "Flipping..." : "Flip Coin"}
        </button>

        <button
          onClick={resetCounts}
          className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white font-medium transition"
        >
          Reset
        </button>

        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 active:scale-95 text-white font-medium transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="flex gap-6 text-lg">
        <p>
          🧠 Heads: <span className="font-semibold">{counts.heads}</span>
        </p>
        <p>
          🌀 Tails: <span className="font-semibold">{counts.tails}</span>
        </p>
      </div>

      <p className="mt-8 text-gray-400 text-sm">Made by BeyondTabbouleh 🩷</p>
    </main>
  );
}
