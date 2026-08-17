export type NavLink = { href: string; key: string };
export type NavGroup = { key: string; children: readonly NavLink[] };
export type NavItem = NavLink | NavGroup;

export const NAV_SERVICES: NavGroup = {
  key: "services",
  children: [
    { href: "/services/usa", key: "servicesUsa" },
    { href: "/services/europe", key: "servicesEurope" },
    { href: "/services/china", key: "servicesChina" },
    { href: "/services/korea", key: "servicesKorea" },
    { href: "/services/buyout", key: "servicesBuyout" },
    { href: "/services/trade-in", key: "servicesTradeIn" },
  ],
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  NAV_SERVICES,
  { href: "/cars", key: "cars" },
  { href: "/reviews", key: "reviews" },
  { href: "/faq", key: "faq" },
];

export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

export function isNavLink(item: NavItem): item is NavLink {
  return !isNavGroup(item);
}

/** Top-level entries only — groups are dropped, not flattened. */
export const NAV_TOP_LEVEL: readonly NavLink[] = NAV_ITEMS.filter(isNavLink);

/** NAV_ITEMS flattened — for navigations that render groups inline. */
export const NAV_LINKS: readonly NavLink[] = NAV_ITEMS.flatMap((item) =>
  isNavGroup(item) ? [...item.children] : [item],
);

export function isNavItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavGroupActive(pathname: string, group: NavGroup) {
  return group.children.some(({ href }) => isNavItemActive(pathname, href));
}
