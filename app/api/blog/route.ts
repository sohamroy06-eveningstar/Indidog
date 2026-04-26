import { NextResponse } from "next/server";
import { readData } from "@/lib/fileDb";

export async function GET() {
  const data = await readData("blog.json");
  return NextResponse.json(data);
}