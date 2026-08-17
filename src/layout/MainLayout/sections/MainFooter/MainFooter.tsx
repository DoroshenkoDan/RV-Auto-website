import { FooterBottom } from "./sections/FooterBottom";
import { FooterBrand } from "./sections/FooterBrand";
import { FooterContacts } from "./sections/FooterContacts";
import { FooterNav } from "./sections/FooterNav";
import { FooterServices } from "./sections/FooterServices";

export function MainFooter() {
  return (
    <footer className="bg-night text-sand">
      <div className="page-shell py-12 lg:py-16">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.4fr]">
          <FooterBrand className="sm:col-span-2 lg:col-span-1" />

          <FooterNav />

          <FooterServices />

          <FooterContacts className="sm:col-span-2 lg:col-span-1" />
        </div>

        <FooterBottom className="mt-12" />
      </div>
    </footer>
  );
}
