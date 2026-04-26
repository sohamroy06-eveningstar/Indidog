"use client";
import { useState } from "react";
import { PawPrint } from "lucide-react";


export default function MedicalTabs({ data }: any) {
  const [active, setActive] = useState("diseases");

  return (
    <div className="mt-16 max-w-6xl mx-auto">

      {/* TABS */}
      <div className="flex gap-3 justify-center mb-10">
        {["diseases", "vaccines", "medicines"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-5 py-2 rounded-full text-sm capitalize transition ${
              active === tab
                ? "bg-black text-white"
                : "bg-white/50 backdrop-blur text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {active === "diseases" &&
          data?.diseases?.map((item: any) => (
            <UniversalCard key={item.id} item={item} />
          ))}

        {active === "vaccines" &&
          data?.vaccines?.map((item: any) => (
            <UniversalCard key={item.id} item={item} />
          ))}

        {active === "medicines" &&
          data?.medicines?.map((item: any) => (
            <UniversalCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

//
// 🔥 UNIVERSAL CARD (WORKS FOR ALL TYPES)
//
function UniversalCard({ item }: any) {
  return (
    <div className="group bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-300 border border-white/30 hover:-translate-y-2 hover:scale-[1.02]">

      {/* TITLE */}
      <div className="flex items-center gap-2 mb-3">
        <PawPrint className="w-5 h-5 text-black" />
        <h2 className="text-lg font-semibold text-gray-800">
          {item.name || item.id}
        </h2>
      </div>

      {/* FULL DATA */}
      <div className="space-y-2 text-sm text-gray-700">
        {Object.entries(item).map(([key, value]) => {
          if (key === "name" || key === "id") return null;

          return (
            <div key={key}>
              <span className="font-medium capitalize">{formatKey(key)}:</span>
              {renderValue(value)}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        🐾 Full Medical Data
      </div>
    </div>
  );
}

//
// 🔧 VALUE RENDERER (handles everything)
//
function renderValue(value: any): any {
  if (value === null || value === undefined) return null;

  // Array
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc ml-5">
        {value.map((v, i) => (
          <li key={i}>
            {typeof v === "object" ? renderValue(v) : String(v)}
          </li>
        ))}
      </ul>
    );
  }

  // Object
  if (typeof value === "object") {
    return (
      <div className="ml-3 border-l pl-3 space-y-1">
        {Object.entries(value).map(([k, v]) => (
          <div key={k}>
            <span className="font-medium capitalize">{formatKey(k)}:</span>
            {renderValue(v)}
          </div>
        ))}
      </div>
    );
  }

  // Primitive
  return <span> {String(value)}</span>;
}

//
// 🧹 FORMAT KEYS (clean labels)
//
function formatKey(key: string) {
  return key.replace(/_/g, " ");
}