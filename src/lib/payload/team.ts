import type { Team } from "@/payload-types";
import type { Locale } from "@/i18n/routing";

import { getPayloadClient } from "./client";

export async function getTeamMembers(locale: Locale): Promise<Team[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "team",
    locale,
    sort: "order",
    depth: 1,
    limit: 0,
  });
  return result.docs;
}
