"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex">
        <div className="flex gap-6 px-8 py-3 rounded-full bg-white/70 backdrop-blur-xl shadow-xl border border-white/20">
          <Link href="/">Home</Link>
          <Link href="/medical">Medical</Link>
          <Link href="/food">Food</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 md:hidden z-50">
        
        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-white/40 backdrop-blur-xl shadow-lg rounded-full px-4 py-3 flex flex-col gap-1 border border-white/20"
        >
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
        </button>

        {/* Menu */}
        {open && (
          <div className="mt-3 flex gap-6 px-6 py-3 rounded-full bg-white/40 backdrop-blur-xl shadow-lg text-black border border-white/20">
            <Link href="/">Home</Link>
            <Link href="/medical">Medical</Link>
            <Link href="/food">Food</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/blog">Blog</Link>
          </div>
        )}
      </nav>
    </>
  );
}