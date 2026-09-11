import type { CalculatorInput } from "@/lib/calculator/types";
import { Section } from "@/ui/section";

import { LeadSection } from "./components/LeadSection";

export function ContactsPage({
  initialInput,
}: {
  initialInput: CalculatorInput | null;
}) {
  return (
    <Section>
      <LeadSection initialInput={initialInput} />
    </Section>
  );
}
