import { Category, RentalPlan } from "@/types";

export { MATERIALS, getMaterialById, getMaterialsByCategory } from "@/lib/materials";

export const CATEGORIES: Category[] = [
  "美容・コスメ",
  "食品・飲料",
  "ファッション",
  "ライフスタイル",
  "キッズ・ベビー",
  "Vlog",
  "特殊施設",
];

export const RENTAL_PLANS: RentalPlan[] = [
  {
    id: "starter",
    name: "スターター",
    slots: 5,
    price: 29800,
    description: "まずは試したい方向け",
    features: ["同時レンタル5枠", "全カテゴリ利用可", "返却後すぐ再レンタル"],
  },
  {
    id: "standard",
    name: "スタンダード",
    slots: 20,
    price: 79800,
    description: "本格的に広告テストを回す",
    features: ["同時レンタル20枠", "全カテゴリ利用可", "返却後すぐ再レンタル", "優先サポート"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "エンタープライズ",
    slots: 50,
    price: 149800,
    description: "チーム・代理店向け",
    features: ["同時レンタル50枠", "全カテゴリ利用可", "返却後すぐ再レンタル", "専任サポート", "メンバー追加可"],
  },
];
