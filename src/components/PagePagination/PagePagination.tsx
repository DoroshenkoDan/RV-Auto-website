import type { ComponentProps } from "react";
import { useTranslations } from "next-intl";

import type { Link } from "@/i18n/navigation";
import { getPageItems } from "@/lib/catalog/params";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  label: string;
  getHref: (page: number) => ComponentProps<typeof Link>["href"];
  className?: string;
}

export function PagePagination({
  currentPage,
  totalPages,
  label,
  getHref,
  className,
}: Props) {
  const t = useTranslations("pagination");

  if (totalPages <= 1) return null;

  return (
    <Pagination aria-label={label} className={className}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={getHref(currentPage - 1)}
              text={t("previous")}
              aria-label={t("previousLabel")}
            />
          </PaginationItem>
        )}
        {getPageItems(currentPage, totalPages).map((item, i) => (
          <PaginationItem key={`${item}-${i}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={getHref(item)}
                isActive={item === currentPage}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={getHref(currentPage + 1)}
              text={t("next")}
              aria-label={t("nextLabel")}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
