"use client"

import type { ReactNode } from "react"
import { Toast } from "@base-ui/react/toast"
import { CircleAlert, CircleCheck, X } from "lucide-react"
import { useTranslations } from "next-intl"
// TODO: redesign toaster component
export function Toaster({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider limit={1}>
      {children}

      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-5 left-5 right-20 z-70 sm:bottom-8 sm:left-8 sm:right-auto sm:w-90">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}

function ToastList() {
  const t = useTranslations("toast")

  const { toasts } = Toast.useToastManager()

  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      swipeDirection={["left", "down"]}
      className="absolute bottom-0 left-0 w-full rounded-md border border-line bg-canvas text-ink shadow-[0_0_32px_--alpha(var(--color-night)/35%)] transition-[opacity,transform] duration-300 ease-out data-ending-style:translate-y-4 data-ending-style:opacity-0 data-limited:opacity-0 data-starting-style:translate-y-4 data-starting-style:opacity-0 motion-reduce:transition-none"
    >
      <Toast.Content className="flex items-start gap-x-3 p-4">
        {toast.type === "error" ? (
          <CircleAlert
            aria-hidden
            className="mt-0.5 size-5 shrink-0 text-destructive"
          />
        ) : (
          <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-y-1">
          <Toast.Title className="font-semibold" />
          <Toast.Description className="text-[13px] leading-normal text-ink-muted" />
        </div>

        <Toast.Close
          aria-label={t("close")}
          className="-me-1 -mt-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <X aria-hidden className="size-4" />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}
