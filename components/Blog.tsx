"use client";

import { motion } from "framer-motion";

export default function Blog({ blogs }: any) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold text-gray-900">
          Latest Dog Blogs 🐶
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {blogs.map((blog: any, i: number) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="backdrop-blur-xl bg-white/40 border border-white/20 rounded-2xl shadow-xl overflow-hidden"
            >
              <img
                src={blog.image}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 text-left">
                <h3 className="font-semibold text-lg text-gray-900">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  {blog.description}
                </p>

                <button className="mt-4 text-sm text-black font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}