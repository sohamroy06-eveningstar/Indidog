export function normalizeSlug(str: string = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // remove special chars
    .replace(/\s+/g, "-")       // spaces → hyphen
    .replace(/-+/g, "-");       // collapse multiple "-"
}

export function matchSlug(a?: string, b?: string) {
  return normalizeSlug(a || "") === normalizeSlug(b || "");
}