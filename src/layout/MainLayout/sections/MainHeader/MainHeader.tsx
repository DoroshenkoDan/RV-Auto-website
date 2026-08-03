import { Logo } from "@/components/Logo"

import { HeaderActions } from "./sections/HeaderActions"
import { LocaleSwitcher } from "./sections/LocaleSwitcher"
import { MainNav } from "./sections/MainNav"
import { MobileMenu } from "./sections/MobileMenu"

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 bg-night/90 backdrop-blur-md">
      <div className="page-shell flex items-center justify-between py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-x-8">
        <Logo className="justify-self-start" />

        <MainNav className="hidden justify-self-center lg:block" />

        <div className="flex items-center gap-x-6 justify-self-end">
          <LocaleSwitcher />
          <HeaderActions className='hidden lg:flex' />
          <MobileMenu className="lg:hidden" />
        </div>
      </div>
    </header>
  )
}
