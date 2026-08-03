export const PHONE_HREF = "tel:+380000000000";
export const PHONE_DISPLAY = "+38 000 000 00 00";

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "#" },
  { name: "Telegram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "TikTok", href: "#" },
] as const;

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];
