
import { PawPrint } from "lucide-react";
import MedicalTabs from "./MedicalTabs";
async function getMedical() {
  const res = await fetch("http://127.0.0.1:3000/api/medical", {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function MedicalPage() {
  const data = await getMedical();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d63434] via-[#f5f5f5] to-white px-6 py-12 pt-28">

      {/* HERO */}
      <div className="max-w-6xl mx-auto text-left">
        <div className="flex items-center gap-2 mb-4 animate-bounce">
          <PawPrint className="w-8 h-8 text-black" />
          <span className="text-sm text-gray-700">Dog Health Guide</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-black">
          IndiDog Medical Care 🐶
        </h1>

        <p className="text-gray-600 mt-4 text-lg max-w-xl">
          Essential health tips, treatments, and guidance for Indian dogs.
        </p>
      </div>




      {/* TABS UI */}
      {data ? (
        <MedicalTabs data={data} />
      ) : (
        <p className="text-center mt-20 text-gray-500">
          Failed to load medical data
        </p>
      )}
    </div>
  );
}