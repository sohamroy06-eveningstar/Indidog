"use client";

import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const fetchReviews = async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    if (!name || !comment) return;

    await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ name, comment, image }),
    });

    setName("");
    setComment("");
    setImage(null);

    fetchReviews();
  };

  const deleteReview = async (id: number) => {
    await fetch("/api/reviews", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchReviews();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6d4d29] to-white px-6 py-12 pt-28 font-[Poppins]">
      
      {/* HEADER */}
      <div className="text-center max-w-xl mx-auto">
        <div className="flex justify-center mb-4 animate-bounce">
          <PawPrint className="w-10 h-10 text-black" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          IndiDog Reviews 💬
        </h1>

        <p className="text-white mt-3 text-lg">
          Share your experience with Indian dogs
        </p>
      </div>

      {/* FORM */}
      <div className="mt-12 max-w-3xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="font-semibold text-xl mb-6 text-gray-900">
          Add Your Review 🐾
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="border border-gray-200 text-black rounded-xl p-3 focus:ring-2 focus:ring-black outline-none transition"
          />

          {/* Comment */}
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your comment"
            className="border border-gray-200 text-black rounded-xl p-3 focus:ring-2 focus:ring-black outline-none transition md:col-span-2"
          />

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="border border-gray-200 text-black rounded-xl p-2 text-sm cursor-pointer"
          />

          {/* Button */}
          <button
            onClick={submit}
            className="bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition md:col-span-2"
          >
            Post Review
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-12 max-w-4xl mx-auto space-y-6">
        {reviews.map((r: any) => (
          <div
            key={r.id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition duration-300 flex justify-between items-start"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <PawPrint className="w-4 h-4 text-black" />
                <b className="text-gray-900 text-lg">{r.name}</b>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {r.comment}
              </p>

              {r.image && (
                <img
                  src={r.image}
                  className="mt-4 rounded-xl w-full h-56 object-cover shadow"
                />
              )}
            </div>

            {/* DELETE */}
            <button
              onClick={() => deleteReview(r.id)}
              className="text-red-500 text-sm ml-4 hover:text-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}