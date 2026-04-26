import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/fileDb";

export async function GET() {
  try {
    const reviews = await readData("reviews.json");
    return NextResponse.json(reviews);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const reviews = await readData("reviews.json");

    const newReview = {
      id: Date.now(),
      name: body.name,
      comment: body.comment,
      image: body.image || null,
    };

    reviews.push(newReview);

    await writeData("reviews.json", reviews);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ error: "POST failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    let reviews = await readData("reviews.json");

    reviews = reviews.filter((r: any) => r.id !== id);

    await writeData("reviews.json", reviews);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: "DELETE failed" }, { status: 500 });
  }
}