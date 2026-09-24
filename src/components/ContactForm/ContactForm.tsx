"use client";

import { useState } from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { Toast } from "@base-ui/react/toast";
import { useTranslations } from "next-intl";

import { useLeadGuards } from "@/components/LeadGuards";
import { Link } from "@/i18n/navigation";
import {
  NAME_MAX,
  NAME_MIN,
  NAME_PATTERN,
  PHONE_PATTERN,
  PHONE_RAW_MAX,
  normalizePhone,
  type LeadFailureReason,
  type LeadResult,
  type LeadSource,
  type Messenger,
} from "@/lib/leads";
import { submitLead } from "@/lib/leads/submitLead";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { FIELD_ERROR, FIELD_ERROR_SLOT, fieldControl } from "@/ui/field";
import { SegmentedControl } from "@/ui/segmented-control";

const MESSENGER_OPTIONS: { value: Messenger; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "whatsapp", label: "WhatsApp" },
];

export function ContactForm({
  source,
  layout = "stack",
  tone = "dark",
  onSuccess,
  className,
}: {
  source: LeadSource;
  layout?: "stack" | "row";
  tone?: "light" | "dark";
  onSuccess?: () => void;
  className?: string;
}) {
  const t = useTranslations("contactForm");
  const errors = useTranslations("leads.errors");
  const toastManager = Toast.useToastManager();
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { guards, readGuards } = useLeadGuards();

  const inRow = layout === "row";
  const control = fieldControl({ tone });

  function showError(reason: LeadFailureReason) {
    toastManager.add({
      type: "error",
      priority: "high",
      title: t("toast.error.title"),
      description: errors(
        reason === "rate-limited" ? "rateLimited" : "generic",
      ),
    });
  }

  async function handleSubmit(formValues: Record<string, unknown>) {
    setSubmitting(true);

    let result: LeadResult;

    try {
      result = await submitLead({
        ...formValues,
        ...readGuards(),
        source,
      });
    } catch {
      showError("failed");

      return;
    } finally {
      setSubmitting(false);
    }

    if (result.ok) {
      toastManager.add({
        type: "success",
        priority: "low",
        title: t("toast.success.title"),
        description: t("toast.success.description"),
      });

      setFormKey((previous) => previous + 1);
      onSuccess?.();

      return;
    }

    showError(result.reason);
  }

  return (
    <Form
      key={formKey}
      onFormSubmit={handleSubmit}
      className={cn("relative flex flex-col gap-y-3", className)}
    >
      {guards}

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

            return raw.length >= NAME_MIN && NAME_PATTERN.test(raw)
              ? null
              : t("name.invalid");
          }}
          className={cn("flex flex-col", inRow && "lg:min-w-0 lg:flex-1")}
        >
          <Field.Control
            type="text"
            required
            maxLength={NAME_MAX}
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
            const raw = normalizePhone(String(value ?? ""));

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
            maxLength={PHONE_RAW_MAX}
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
            options={MESSENGER_OPTIONS}
            defaultValue={MESSENGER_OPTIONS[0].value}
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
