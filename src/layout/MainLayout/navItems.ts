export type NavLink = { href: string; key: string };
export type NavGroup = { key: string; children: readonly NavLink[] };
export type NavItem = NavLink | NavGroup;

export const NAV_SERVICES: NavGroup = {
  key: "services",
  children: [
    { href: "/services/china", key: "servicesChina" },
    { href: "/services/korea", key: "servicesKorea" },
    { href: "/services/usa", key: "servicesUsa" },
    { href: "/services/canada", key: "servicesCanada" },
    { href: "/services/europe", key: "servicesEurope" },
    { href: "/services/norway", key: "servicesNorway" },
    { href: "/services/consignment", key: "servicesInStock" },
    { href: "/services/buyout", key: "servicesBuyout" },
  ],
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", key: "home" },
  { href: "/cars", key: "cars" },
  { href: "/about", key: "about" },
  { href: "/reviews", key: "reviews" },
  NAV_SERVICES,
  { href: "/faq", key: "faq" },
];

export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

export function isNavLink(item: NavItem): item is NavLink {
  return !isNavGroup(item);
}

export const NAV_TOP_LEVEL: readonly NavLink[] = NAV_ITEMS.filter(isNavLink);

export const NAV_LINKS: readonly NavLink[] = NAV_ITEMS.flatMap((item) =>
  isNavGroup(item) ? [...item.children] : [item],
);

export function isNavItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavGroupActive(pathname: string, group: NavGroup) {
  return group.children.some(({ href }) => isNavItemActive(pathname, href));
}
