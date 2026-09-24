import type { Lead } from "./types";

// TODO: deliver the lead to the CRM once the integration lands
export async function deliver(lead: Lead): Promise<void> {
  console.info("[leads] received", {
    source: lead.source,
    name: lead.name,
    phone: lead.phone,
    messenger: lead.messenger,
    comment: lead.comment || null,
    carSlug: lead.carSlug,
    total: lead.calculation?.total ?? null,
    at: new Date().toISOString(),
  });
}
