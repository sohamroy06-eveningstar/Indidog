import Link from "next/link";

/* FETCH */
async function getBlogs() {
  const res = await fetch("http://127.0.0.1:3000/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getBlogs();
  const blogs = data?.blogs || [];

  const currentSlug = decodeURIComponent(slug || "")
    .toLowerCase()
    .trim();

  const blog = blogs.find((b: any) => {
    const blogSlug = (b.slug || "")
      .toLowerCase()
      .trim();

    return blogSlug === currentSlug;
  });

  if (!blog) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-center"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Blog not found
          </h2>
          <Link href="/blog" className="text-blue-600">
            ← Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-12 pt-28 relative overflow-hidden"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >

      {/* 🔴 PREMIUM BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#34b6d6] via-[#28d4de] to-white -z-10"></div>

      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      {/* 🐶 HERO */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
          {blog.title}
        </h1>

        <div className="mt-4 flex justify-center gap-3 text-xs text-white">
          <span className="bg-black px-3 py-1 rounded-full backdrop-blur">
            {blog.read_time}
          </span>
          <span className="bg-black px-3 py-1 rounded-full backdrop-blur capitalize">
            {blog.category}
          </span>
        </div>
      </div>

      {/* 📄 CONTENT CARD */}
      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">

        <div className="space-y-5 text-gray-800 leading-relaxed">

          {blog.content.map((block: any, i: number) => {

            if (block.type === "paragraph") {
              return (
                <p key={i} className="text-[15px] leading-7">
                  {block.text}
                </p>
              );
            }

            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="text-xl font-semibold text-gray-900 mt-6 border-l-4 border-red-500 pl-3"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={i} className="list-disc ml-6 space-y-1 text-sm">
                  {block.items.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              );
            }

            return null;
          })}
        </div>

        {/* BACK BUTTON */}
        <Link
          href="/blog"
          className="inline-block mt-10 text-sm font-medium text-red-600 hover:underline"
        >
          ← Back to blogs
        </Link>

      </div>
    </div>
  );
}