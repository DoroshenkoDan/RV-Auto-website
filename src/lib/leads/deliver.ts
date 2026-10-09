import { buildCard } from "./crm/buildCard";
import { createCard } from "./crm/createCard";
import type { Lead } from "./types";

export async function deliver(lead: Lead): Promise<void> {
  try {
    await createCard(buildCard(lead));
  } catch (cause) {
    console.error("[leads] failed to create a KeyCRM card", cause);
    throw cause;
  }
}
