import { FooterBottom } from "./sections/FooterBottom";
import { FooterBrand } from "./sections/FooterBrand";
import { FooterContacts } from "./sections/FooterContacts";
import { FooterNav } from "./sections/FooterNav";

export function MainFooter() {
  return (
    <footer className="bg-night text-sand">
      <div className="page-shell py-12 lg:py-16">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr]">
          <FooterBrand className="sm:col-span-2 lg:col-span-1" />

          <FooterNav />

          <FooterContacts />
        </div>

        <FooterBottom className="mt-12" />
      </div>
    </footer>
  );
}
