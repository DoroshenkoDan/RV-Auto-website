"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { CallbackButton } from "@/components/CallbackButton";

export function CallbackDialog() {
  const t = useTranslations("callback");

  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={t("trigger")}
        render={
          <CallbackButton className="fixed right-5 bottom-5 z-30 sm:right-8 sm:bottom-8" />
        }
      />

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-60 bg-night/70 backdrop-blur-sm transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />

        <Dialog.Viewport className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto p-6">
          <Dialog.Popup className="relative w-full max-w-md rounded-md border border-line bg-canvas p-6 text-ink shadow-[0_0_32px_--alpha(var(--color-night)/25%)] transition duration-200 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
            <Dialog.Close
              aria-label={t("close")}
              className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-md text-ink-muted transition-colors duration-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>

            <Dialog.Title className="pe-10 text-h3 font-bold tracking-[0.12em] uppercase">
              {t("title")}
            </Dialog.Title>

            <Dialog.Description className="mt-2 text-ink-muted">
              {t("description")}
            </Dialog.Description>

            <div className="mt-6 min-h-32" />
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
