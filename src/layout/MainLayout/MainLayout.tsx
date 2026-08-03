import type { ReactNode } from "react"

import { CallbackDialog } from "@/components/CallbackDialog"

import { MainFooter } from "./sections/MainFooter"
import { MainHeader } from "./sections/MainHeader"

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      <main className="flex-1">{children}</main>
      <MainFooter />
      <CallbackDialog />
    </>
  )
}
