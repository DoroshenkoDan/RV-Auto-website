import type { ContactFormValues } from "./types"

export async function submitLead(values: ContactFormValues) {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return Object.values(values).every(Boolean)
}
