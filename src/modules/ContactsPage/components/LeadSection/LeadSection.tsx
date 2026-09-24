"use client";

import { useEffect, useState, useTransition } from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { Toast } from "@base-ui/react/toast";
import { useTranslations } from "next-intl";

import { useLeadGuards } from "@/components/LeadGuards";
import { Link, useRouter } from "@/i18n/navigation";
import { estimate } from "@/lib/calculator/estimate";
import { DEFAULT_CALCULATOR_INPUT } from "@/lib/calculator/options";
import type { CalculatorInput } from "@/lib/calculator/types";
import {
  COMMENT_MAX,
  NAME_MAX,
  NAME_MIN,
  NAME_PATTERN,
  PHONE_PATTERN,
  PHONE_RAW_MAX,
  normalizePhone,
  type LeadFailureReason,
  type LeadResult,
} from "@/lib/leads";
import { submitLead } from "@/lib/leads/submitLead";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  FIELD_ERROR,
  FIELD_ERROR_SLOT,
  FIELD_ROOT,
  fieldControl,
  fieldLabel,
} from "@/ui/field";
import { SectionTitle } from "@/ui/section";
import { SegmentedControl } from "@/ui/segmented-control";

import { clearOrderCar } from "./clearOrderCar";
import { CarDetails } from "./components/CarDetails";
import { ContactPanel } from "./components/ContactPanel";
import type { LeadCar, LeadMode, Messenger } from "./types";

const MODES: LeadMode[] = ["simple", "detailed"];

const MESSENGER_OPTIONS: { value: Messenger; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "whatsapp", label: "WhatsApp" },
];

export function LeadSection({
  initialInput,
  selectedCar,
  hasStaleCar,
}: {
  initialInput: CalculatorInput | null;
  selectedCar: LeadCar | null;
  hasStaleCar: boolean;
}) {
  const t = useTranslations("contactsPage");
  const form = useTranslations("contactsPage.leadSection");
  const errors = useTranslations("leads.errors");
  const toastManager = Toast.useToastManager();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [mode, setMode] = useState<LeadMode>(
    initialInput ? "detailed" : "simple",
  );
  const [car, setCar] = useState<CalculatorInput>(
    initialInput ?? DEFAULT_CALCULATOR_INPUT,
  );
  const [comment, setComment] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { guards, readGuards } = useLeadGuards();

  const detailed = !selectedCar && mode === "detailed";
  const result = estimate(car);

  useEffect(() => {
    if (hasStaleCar) clearOrderCar();
  }, [hasStaleCar]);

  function removeSelectedCar() {
    startTransition(async () => {
      await clearOrderCar();
      router.replace("/contacts", { scroll: false });
    });
  }

  function showError(reason: LeadFailureReason) {
    toastManager.add({
      type: "error",
      priority: "high",
      title: form("toast.error.title"),
      description: errors(
        reason === "rate-limited" ? "rateLimited" : "generic",
      ),
    });
  }

  async function handleSubmit(formValues: Record<string, unknown>) {
    setSubmitting(true);

    let outcome: LeadResult;

    try {
      outcome = await submitLead({
        ...formValues,
        ...readGuards(),
        source: "contacts",
        comment,
        calculation: detailed && result ? car : null,
        carSlug: selectedCar?.slug ?? null,
      });
    } catch {
      showError("failed");

      return;
    } finally {
      setSubmitting(false);
    }

    if (!outcome.ok) {
      showError(outcome.reason);

      return;
    }

    toastManager.add({
      type: "success",
      priority: "low",
      title: form("toast.success.title"),
      description: form("toast.success.description"),
    });

    setCar(DEFAULT_CALCULATOR_INPUT);
    setComment("");
    setFormKey((previous) => previous + 1);

    if (selectedCar) removeSelectedCar();
  }

  return (
    <>
      <div className="mb-block flex flex-col gap-x-6 gap-y-stack lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionTitle spacing="tight">{t("title")}</SectionTitle>
          <p className="max-w-lg text-lead text-ink-muted">{t("lede")}</p>
        </div>

        {!selectedCar && (
          <SegmentedControl<LeadMode>
            options={MODES.map((item) => ({
              value: item,
              label: form(`mode.${item}`),
            }))}
            value={mode}
            onValueChange={setMode}
            aria-label={form("mode.label")}
            stretch
            className="shrink-0 lg:w-fit"
          />
        )}
      </div>

      <div className="grid overflow-hidden rounded-md border border-line lg:grid-cols-[3fr_2fr]">
        <Form
          key={formKey}
          onFormSubmit={handleSubmit}
          className="relative flex flex-col bg-white p-block"
        >
          {guards}

          <div className="grid gap-x-stack gap-y-stack sm:grid-cols-2">
            <Field.Root
              name="name"
              validate={(value) => {
                const raw = String(value ?? "").trim();

                if (!raw) {
                  return null;
                }

                return raw.length >= NAME_MIN && NAME_PATTERN.test(raw)
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
                maxLength={NAME_MAX}
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
                const raw = normalizePhone(String(value ?? ""));

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
                maxLength={PHONE_RAW_MAX}
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
              <SegmentedControl
                options={MESSENGER_OPTIONS}
                defaultValue={MESSENGER_OPTIONS[0].value}
                stretch
              />
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
              </div>
            </div>
          </div>

          <Field.Root name="comment" className={cn(FIELD_ROOT, "mt-stack")}>
            <Field.Label className={fieldLabel()}>
              {form("comment.label")}
            </Field.Label>
            <Field.Control
              render={<textarea rows={4} />}
              maxLength={COMMENT_MAX}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={form("comment.placeholder")}
              className={fieldControl({ className: "h-auto min-h-28 py-3" })}
            />
          </Field.Root>

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

        <ContactPanel
          car={car}
          result={result}
          detailed={detailed}
          selectedCar={selectedCar}
          onRemoveCar={removeSelectedCar}
        />
      </div>
    </>
  );
}
