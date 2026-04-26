"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFEFE5] px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-200 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <PawPrint className="w-12 h-12 text-black" />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          IndiDog 🐶
        </h1>

        <p className="text-lg text-gray-700 mt-4">
          Care, food & community for Indian dogs — all in one place
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/medical"
            className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Medical
          </Link>

          <Link
            href="/food"
            className="border border-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition"
          >
            Food
          </Link>
        </div>
      </motion.div>
    </section>
  );
}