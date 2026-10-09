import type { buildCard } from "./buildCard";
import { KEYCRM_API_URL, REQUEST_TIMEOUT_MS, RETRY_DELAY_MS } from "./config";

export type Card = ReturnType<typeof buildCard>;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function post(card: Card, key: string) {
  return fetch(`${KEYCRM_API_URL}/pipelines/cards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(card),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

export async function createCard(card: Card) {
  const key = process.env.KEYCRM_API_KEY;

  if (!key) {
    throw new Error("KEYCRM_API_KEY is not configured");
  }

  let response = await post(card, key);

  if (response.status === 429 || response.status >= 500) {
    await wait(RETRY_DELAY_MS);
    response = await post(card, key);
  }

  if (!response.ok) {
    throw new Error(
      `KeyCRM responded ${response.status}: ${await response.text()}`,
    );
  }
}
