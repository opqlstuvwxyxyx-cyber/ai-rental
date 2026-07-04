export type Category =
  | "美容・コスメ"
  | "食品・飲料"
  | "ファッション"
  | "ライフスタイル"
  | "キッズ・ベビー"
  | "Vlog"
  | "特殊施設";

export interface Material {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
  createdAt: string;
}

export interface RentalPlan {
  id: string;
  name: string;
  slots: number;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Rental {
  materialId: string;
  rentedAt: string;
}
