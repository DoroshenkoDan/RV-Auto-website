"use client";

import { useState } from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { Toast } from "@base-ui/react/toast";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { FIELD_ERROR, FIELD_ERROR_SLOT, fieldControl } from "@/ui/field";
import { SegmentedControl } from "@/ui/segmented-control";

import { submitLead } from "./submitLead";
import type { ContactFormValues, Messenger } from "./types";

const MESSENGERS: { value: Messenger; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "whatsapp", label: "WhatsApp" },
];

const NAME_PATTERN = /^\p{L}[\p{L}\s'’-]*$/u;
const PHONE_PATTERN = /^\+?\d{10,15}$/;

export function ContactForm({
  layout = "stack",
  tone = "dark",
  onSuccess,
  className,
}: {
  layout?: "stack" | "row";
  tone?: "light" | "dark";
  onSuccess?: () => void;
  className?: string;
}) {
  const t = useTranslations("contactForm");
  const toastManager = Toast.useToastManager();
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const inRow = layout === "row";
  const control = fieldControl({ tone });

  async function handleSubmit(formValues: Record<string, unknown>) {
    setSubmitting(true);

    const values: ContactFormValues = {
      name: String(formValues.name ?? "").trim(),
      phone: String(formValues.phone ?? "").trim(),
      messenger: formValues.messenger as Messenger,
    };

    const ok = await submitLead(values);

    setSubmitting(false);

    toastManager.add({
      type: ok ? "success" : "error",
      priority: ok ? "low" : "high",
      title: ok ? t("toast.success.title") : t("toast.error.title"),
      description: ok
        ? t("toast.success.description")
        : t("toast.error.description"),
    });

    if (ok) {
      setFormKey((previous) => previous + 1);
      onSuccess?.();
    }
  }

  return (
    <Form
      key={formKey}
      onFormSubmit={handleSubmit}
      className={cn("flex flex-col gap-y-3", className)}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          inRow && "lg:flex-row lg:items-start",
        )}
      >
        <Field.Root
          name="name"
          validate={(value) => {
            const raw = String(value ?? "").trim();

            if (!raw) {
              return null;
            }

            return raw.length >= 2 && NAME_PATTERN.test(raw)
              ? null
              : t("name.invalid");
          }}
          className={cn("flex flex-col", inRow && "lg:min-w-0 lg:flex-1")}
        >
          <Field.Control
            type="text"
            required
            maxLength={60}
            autoComplete="name"
            aria-label={t("name.label")}
            placeholder={t("name.placeholder")}
            className={control}
          />

          <div className={FIELD_ERROR_SLOT}>
            <Field.Error match="valueMissing" className={FIELD_ERROR}>
              {t("name.required")}
            </Field.Error>
            <Field.Error match="customError" className={FIELD_ERROR} />
          </div>
        </Field.Root>

        <Field.Root
          name="phone"
          validate={(value) => {
            const raw = String(value ?? "").replace(/[\s()-]/g, "");

            if (!raw) {
              return null;
            }

            return PHONE_PATTERN.test(raw) ? null : t("phone.invalid");
          }}
          className={cn("flex flex-col", inRow && "lg:min-w-0 lg:flex-1")}
        >
          <Field.Control
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            aria-label={t("phone.label")}
            placeholder={t("phone.placeholder")}
            className={control}
          />

          <div className={FIELD_ERROR_SLOT}>
            <Field.Error match="valueMissing" className={FIELD_ERROR}>
              {t("phone.required")}
            </Field.Error>
            <Field.Error match="customError" className={FIELD_ERROR} />
          </div>
        </Field.Root>

        <Field.Root name="messenger">
          <SegmentedControl
            options={MESSENGERS}
            defaultValue={MESSENGERS[0].value}
            aria-label={t("messenger.label")}
            tone={tone}
            stretch
            className={cn(inRow && "lg:w-fit")}
          />
        </Field.Root>

        <Button
          type="submit"
          disabled={submitting}
          className={cn("w-full", inRow && "lg:w-auto lg:shrink-0")}
        >
          {t("submit")}
        </Button>
      </div>

      <p
        className={cn(
          "text-center text-label",
          tone === "dark" ? "text-sand/45" : "text-ink-muted",
        )}
      >
        {t.rich("consent", {
          link: (chunks) => (
            <Link
              href="/privacy"
              className={cn(
                "transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                tone === "dark" ? "text-sand/70" : "text-ink",
              )}
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </Form>
  );
}
