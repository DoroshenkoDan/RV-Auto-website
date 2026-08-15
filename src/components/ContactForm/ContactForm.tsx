"use client";

import { useState } from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Toast } from "@base-ui/react/toast";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { submitLead } from "./submitLead";
import type { ContactFormValues, Messenger } from "./types";

const MESSENGERS: { value: Messenger; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "whatsapp", label: "WhatsApp" },
];

const NAME_PATTERN = /^\p{L}[\p{L}\s'’-]*$/u;
const PHONE_PATTERN = /^\+?\d{10,15}$/;

const CONTROL =
  "h-12 w-full rounded-sm border border-sand/12 bg-night-soft px-4 font-mono text-[15px] leading-normal text-sand transition-colors duration-200 placeholder:text-sand/40 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand data-invalid:border-destructive 2xl:h-13";

const ERROR_SLOT = "h-6 pt-1";

const ERROR_TEXT = "text-[13px] leading-normal text-destructive";

export function ContactForm({
  layout = "stack",
  className,
}: {
  layout?: "stack" | "row";
  className?: string;
}) {
  const t = useTranslations("contactForm");
  const toastManager = Toast.useToastManager();
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const inRow = layout === "row";

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
            className={CONTROL}
          />

          <div className={ERROR_SLOT}>
            <Field.Error match="valueMissing" className={ERROR_TEXT}>
              {t("name.required")}
            </Field.Error>
            <Field.Error match="customError" className={ERROR_TEXT} />
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
            className={CONTROL}
          />

          <div className={ERROR_SLOT}>
            <Field.Error match="valueMissing" className={ERROR_TEXT}>
              {t("phone.required")}
            </Field.Error>
            <Field.Error match="customError" className={ERROR_TEXT} />
          </div>
        </Field.Root>

        <Field.Root name="messenger">
          <RadioGroup
            defaultValue={MESSENGERS[0].value}
            aria-label={t("messenger.label")}
            className="flex h-12 gap-1 rounded-sm border border-sand/12 bg-night-soft p-1.25 2xl:h-13"
          >
            {MESSENGERS.map((messenger) => (
              <Radio.Root
                key={messenger.value}
                value={messenger.value}
                className={cn(
                  "flex flex-1 cursor-pointer items-center justify-center rounded-[4px] px-3 text-center text-sm leading-normal text-sand/60 transition-colors duration-200",
                  "hover:text-sand data-checked:bg-brand data-checked:font-semibold data-checked:text-night-soft data-checked:hover:text-night-soft",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                  inRow && "lg:flex-initial lg:px-5",
                )}
              >
                {messenger.label}
              </Radio.Root>
            ))}
          </RadioGroup>
        </Field.Root>

        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "h-12 w-full cursor-pointer rounded-sm bg-brand px-8 text-base leading-normal font-semibold text-night-soft transition-colors duration-200 hover:bg-brand/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60 2xl:h-13",
            inRow && "lg:w-auto lg:shrink-0",
          )}
        >
          {t("submit")}
        </button>
      </div>

      <p className="text-center text-[13px] leading-normal text-sand/45">
        {t.rich("consent", {
          link: (chunks) => (
            <Link
              href="/privacy"
              className="text-sand/70 transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </Form>
  );
}
