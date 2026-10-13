"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const COPIED_MS = 2000;

export function CopyVinButton({ vin }: { vin: string }) {
  const t = useTranslations("carPage");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(vin);
      setCopied(true);
    } catch {}
  };

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? t("copied") : t("copyVin")}
      title={copied ? t("copied") : t("copyVin")}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors duration-200 motion-reduce:transition-none",
        "hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        copied ? "text-brand" : "text-ink-muted hover:text-ink",
      )}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}
