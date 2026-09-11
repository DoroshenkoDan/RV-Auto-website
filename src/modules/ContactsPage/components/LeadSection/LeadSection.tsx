"use client";

import { useState } from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Toast } from "@base-ui/react/toast";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { estimate } from "@/lib/calculator/estimate";
import { DEFAULT_CALCULATOR_INPUT } from "@/lib/calculator/options";
import type { CalculatorInput } from "@/lib/calculator/types";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  FIELD_ERROR,
  FIELD_ERROR_SLOT,
  FIELD_ROOT,
  fieldControl,
  fieldLabel,
  segmentedGroup,
  segmentedItem,
} from "@/ui/field";
import { SectionTitle } from "@/ui/section";

import { CarDetails } from "./components/CarDetails";
import { ContactPanel } from "./components/ContactPanel";
import { submitLead } from "./submitLead";
import type { LeadMode, Messenger } from "./types";

const MODES: LeadMode[] = ["simple", "detailed"];

const MESSENGERS: { value: Messenger; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "whatsapp", label: "WhatsApp" },
];

const NAME_PATTERN = /^\p{L}[\p{L}\s'’-]*$/u;
const PHONE_PATTERN = /^\+?\d{10,15}$/;

export function LeadSection({
  initialInput,
}: {
  initialInput: CalculatorInput | null;
}) {
  const t = useTranslations("contactsPage");
  const form = useTranslations("contactsPage.leadSection");
  const toastManager = Toast.useToastManager();

  const [mode, setMode] = useState<LeadMode>(
    initialInput ? "detailed" : "simple",
  );
  const [car, setCar] = useState<CalculatorInput>(
    initialInput ?? DEFAULT_CALCULATOR_INPUT,
  );
  const [comment, setComment] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const detailed = mode === "detailed";
  const result = estimate(car);

  async function handleSubmit(formValues: Record<string, unknown>) {
    setSubmitting(true);

    await submitLead({
      name: String(formValues.name ?? "").trim(),
      phone: String(formValues.phone ?? "").trim(),
      messenger: formValues.messenger as Messenger,
      comment: detailed ? comment.trim() : "",
      calculation:
        detailed && result ? { input: car, total: result.total } : null,
    });

    setSubmitting(false);

    toastManager.add({
      type: "success",
      priority: "low",
      title: form("toast.success.title"),
      description: form("toast.success.description"),
    });

    setCar(DEFAULT_CALCULATOR_INPUT);
    setComment("");
    setFormKey((previous) => previous + 1);
  }

  return (
    <>
      <div className="mb-block flex flex-col gap-x-6 gap-y-stack lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionTitle spacing="tight">{t("title")}</SectionTitle>
          <p className="max-w-lg text-lead text-ink-muted">{t("lede")}</p>
        </div>

        <RadioGroup
          value={mode}
          onValueChange={(next) => setMode(next as LeadMode)}
          aria-label={form("mode.label")}
          className={segmentedGroup({
            className: "flex h-control shrink-0 self-stretch lg:self-auto",
          })}
        >
          {MODES.map((item) => (
            <Radio.Root
              key={item}
              value={item}
              className={segmentedItem({
                className: "flex-1 px-5 lg:flex-initial",
              })}
            >
              {form(`mode.${item}`)}
            </Radio.Root>
          ))}
        </RadioGroup>
      </div>

      <div className="grid overflow-hidden rounded-md border border-line lg:grid-cols-[3fr_2fr]">
        <Form
          key={formKey}
          onFormSubmit={handleSubmit}
          className="flex flex-col bg-white p-block"
        >
          <div className="grid gap-x-stack gap-y-stack sm:grid-cols-2">
            <Field.Root
              name="name"
              validate={(value) => {
                const raw = String(value ?? "").trim();

                if (!raw) {
                  return null;
                }

                return raw.length >= 2 && NAME_PATTERN.test(raw)
                  ? null
                  : form("name.invalid");
              }}
              className={FIELD_ROOT}
            >
              <Field.Label className={fieldLabel()}>
                {form("name.label")}
              </Field.Label>
              <Field.Control
                type="text"
                required
                maxLength={60}
                autoComplete="name"
                placeholder={form("name.placeholder")}
                className={fieldControl()}
              />

              <div className={FIELD_ERROR_SLOT}>
                <Field.Error match="valueMissing" className={FIELD_ERROR}>
                  {form("name.required")}
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

                return PHONE_PATTERN.test(raw) ? null : form("phone.invalid");
              }}
              className={FIELD_ROOT}
            >
              <Field.Label className={fieldLabel()}>
                {form("phone.label")}
              </Field.Label>
              <Field.Control
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder={form("phone.placeholder")}
                className={fieldControl()}
              />

              <div className={FIELD_ERROR_SLOT}>
                <Field.Error match="valueMissing" className={FIELD_ERROR}>
                  {form("phone.required")}
                </Field.Error>
                <Field.Error match="customError" className={FIELD_ERROR} />
              </div>
            </Field.Root>

            <Field.Root name="messenger" className={FIELD_ROOT}>
              <Field.Label className={fieldLabel()}>
                {form("messenger.label")}
              </Field.Label>
              <RadioGroup
                defaultValue={MESSENGERS[0].value}
                className={segmentedGroup({ className: "flex h-control" })}
              >
                {MESSENGERS.map((messenger) => (
                  <Radio.Root
                    key={messenger.value}
                    value={messenger.value}
                    className={segmentedItem({ className: "flex-1 px-3" })}
                  >
                    {messenger.label}
                  </Radio.Root>
                ))}
              </RadioGroup>
            </Field.Root>
          </div>

          <div
            inert={!detailed}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
              detailed
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-y-stack border-t border-line pt-block">
                <CarDetails value={car} onValueChange={setCar} />

                <Field.Root name="comment" className={FIELD_ROOT}>
                  <Field.Label className={fieldLabel()}>
                    {form("comment.label")}
                  </Field.Label>
                  <Field.Control
                    render={<textarea rows={4} />}
                    maxLength={600}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder={form("comment.placeholder")}
                    className={fieldControl({ className: "h-auto py-3" })}
                  />
                </Field.Root>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-block w-full sm:w-auto sm:self-start"
          >
            {form("submit")}
          </Button>

          <p className="mt-stack text-label text-ink-muted">
            {form.rich("consent", {
              link: (chunks) => (
                <Link
                  href="/privacy"
                  className="text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </Form>

        <ContactPanel car={car} result={result} detailed={detailed} />
      </div>
    </>
  );
}
