import { NextResponse } from "next/server";
import { readData } from "@/lib/fileDb";

export async function GET() {
  const data = await readData("food.json");
  return NextResponse.json(data);
}