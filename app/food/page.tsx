import { PawPrint } from "lucide-react";

async function getFood() {
  const res = await fetch("http://127.0.0.1:3000/api/food", {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function FoodPage() {
  const res = await getFood();

  const categories = res?.diet_categories || [];
  const harmful = res?.harmful_foods || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7de229] to-white px-6 py-12 pt-28">
      
      {/* HEADER */}
      <div className="text-center max-w-xl mx-auto">
        <div className="flex justify-center mb-4 animate-bounce">
          <PawPrint className="w-10 h-10 text-black" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-black">
          IndiDog Food Guide 🍖
        </h1>

        <p className="text-gray-600 mt-3">
          Healthy and nutritious food options for Indian dogs
        </p>
      </div>

      {/* ================== GOOD FOOD ================== */}
      <div className="mt-12 max-w-6xl mx-auto space-y-12">

        {categories.length > 0 ? (
          categories.map((category: any) => (
            <div key={category.id}>
              
              {/* CATEGORY TITLE */}
              <h2 className="text-2xl font-bold text-black mb-4">
                {category.name}
              </h2>

              {/* FOOD GRID */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.foods?.map((food: any, i: number) => (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-300 border border-gray-100 hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <PawPrint className="w-5 h-5 text-black group-hover:rotate-12 transition duration-300" />
                      <h2 className="text-lg font-semibold text-gray-900">
                        {food.name}
                      </h2>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {food.description ||
                        food.benefits?.join(", ") ||
                        food.notes?.join(", ") ||
                        "Nutritional food"}
                    </p>

                    <div className="mt-4 text-xs text-gray-400">
                      🐾 Nutrition Tip
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No food data available
          </p>
        )}
      </div>

      {/* ================== HARMFUL FOODS ================== */}
      {harmful.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          
          <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
            ⚠ Harmful Foods (Avoid Feeding)
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {harmful.map((item: any, i: number) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border shadow-md transition hover:shadow-xl ${
                  item.severity === "critical"
                    ? "bg-red-100 border-red-300"
                    : "bg-yellow-100 border-yellow-300"
                }`}
              >
                <h3 className="text-lg font-bold text-black mb-2">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-700 mb-2">
                  {item.effects?.join(", ")}
                </p>

                <p className="text-xs font-medium text-gray-600">
                  Severity: {item.severity}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}