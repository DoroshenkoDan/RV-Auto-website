"use client";

import { useTranslations } from "next-intl";

import { StatusScreen } from "@/components/StatusScreen";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/ui/button";

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations("errorPages");

  return (
    <StatusScreen
      eyebrow={t("eyebrowError")}
      titleLead={t("titleLead")}
      titleAccent={t("titleAccent")}
      description={t("descriptionError")}
    >
      <Button size="lg" onClick={() => unstable_retry()}>
        {t("retry")}
      </Button>

      <Link
        href="/"
        className={buttonVariants({ variant: "outlineOnDark", size: "lg" })}
      >
        {t("home")}
      </Link>
    </StatusScreen>
  );
}
