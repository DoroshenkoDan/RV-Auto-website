export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/cars", key: "cars" },
  { href: "/delivered", key: "delivered" },
  { href: "/faq", key: "faq" },
] as const

export function isNavItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}
