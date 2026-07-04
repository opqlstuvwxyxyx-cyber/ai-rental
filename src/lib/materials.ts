import { Category, Material } from "@/types";
import materialsData from "@/data/materials.json";

const VALID_CATEGORIES: Category[] = [
  "美容・コスメ",
  "食品・飲料",
  "ファッション",
  "ライフスタイル",
  "キッズ・ベビー",
  "Vlog",
  "特殊施設",
];

function isCategory(value: string): value is Category {
  return VALID_CATEGORIES.includes(value as Category);
}

function parseMaterial(raw: Material, index: number): Material | null {
  if (!raw.title?.trim() || !raw.videoUrl?.trim()) return null;
  if (!isCategory(raw.category)) return null;

  return {
    id: raw.id?.trim() || `material-${index + 1}`,
    title: raw.title.trim(),
    description: raw.description?.trim() || "",
    category: raw.category,
    tags: raw.tags?.length ? raw.tags : [raw.category, "縦型", "UGC"],
    duration: raw.duration ?? 30,
    thumbnailUrl: raw.thumbnailUrl?.trim() || "/videos/thumbs/placeholder.jpg",
    videoUrl: raw.videoUrl.trim(),
    aspectRatio: raw.aspectRatio ?? "9:16",
    createdAt: raw.createdAt || new Date().toISOString(),
  };
}

/** 登録素材は src/data/materials.json のみ（旧デモ24件は含まない） */
export const MATERIALS: Material[] = (materialsData as Material[])
  .map(parseMaterial)
  .filter((m): m is Material => m !== null);

export function getMaterialById(id: string) {
  return MATERIALS.find((m) => m.id === id);
}

export function getMaterialsByCategory(category: Category) {
  return MATERIALS.filter((m) => m.category === category);
}
