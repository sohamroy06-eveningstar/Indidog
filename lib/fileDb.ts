import fs from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

// ensure file exists
async function ensureFile(filePath: string) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]");
  }
}

export async function readData(file: string) {
  const filePath = path.join(dataDir, file);

  await ensureFile(filePath);

  const data = await fs.readFile(filePath, "utf-8");

  return data ? JSON.parse(data) : [];
}

export async function writeData(file: string, data: any) {
  const filePath = path.join(dataDir, file);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}