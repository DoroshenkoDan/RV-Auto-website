export const PHONE_E164 = "+380938241360";
export const PHONE_HREF = `tel:${PHONE_E164}`;
export const PHONE_DISPLAY = "+38 093 824 13 60";

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/revolution.auto1/" },
  { name: "Telegram", href: "https://t.me/RevolutionAuto1" },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590442718988",
  },
  { name: "TikTok", href: "https://www.tiktok.com/@revolution_auto" },
] as const;

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];
