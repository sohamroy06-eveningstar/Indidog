import Link from "next/link";

async function getBlogs() {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/blog", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return null;
  }
}

export default async function BlogPage() {
  const data = await getBlogs();

  const blogs = Array.isArray(data)
    ? data
    : data?.blogs || [];

  if (!blogs.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-center"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div>
          <h2 className="text-xl font-bold mb-2">No blogs found</h2>
          <p className="text-gray-500">
            API data is empty or not loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-12 pt-28 relative overflow-hidden"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >

      {/* 🐶 BACKGROUND (DOG STYLE) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#34b6d6] via-[#28d4de] to-[#fff] -z-10"></div>

      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          IndiDog Blog 🐶
        </h1>
        <p className="text-black mt-3">
          Learn, care, and help street dogs better
        </p>
      </div>

      {/* GRID */}
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

        {blogs.map((blog: any) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group block h-full"
          >
            <div className="h-full flex flex-col justify-between bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-md transition duration-300 hover:shadow-2xl hover:-translate-y-2 border border-white/40">

              {/* CONTENT */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {blog.summary}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  {blog.read_time}
                </span>
                <span className="capitalize">
                  {blog.category}
                </span>
              </div>

              {/* HOVER LINE */}
              <div className="mt-4 h-[2px] w-0 bg-red-500 group-hover:w-full transition-all duration-300 rounded-full"></div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}