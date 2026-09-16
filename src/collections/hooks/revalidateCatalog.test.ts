import { revalidatePath } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  revalidateCatalogAfterChange,
  revalidateCatalogAfterDelete,
} from "./revalidateCatalog";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

const CATALOG_PATHS = [
  ["/(frontend)/[locale]", "page"],
  ["/(frontend)/[locale]/cars", "page"],
  ["/(frontend)/[locale]/cars/[slug]", "page"],
];

function hookArgs(context: Record<string, unknown> = {}) {
  const doc = { id: 1 };
  return { doc, req: { context } } as never;
}

describe("revalidateCatalog hooks", () => {
  beforeEach(() => {
    vi.mocked(revalidatePath).mockClear();
  });

  it("revalidates every catalog page after a change", () => {
    revalidateCatalogAfterChange(hookArgs());

    expect(vi.mocked(revalidatePath).mock.calls).toEqual(CATALOG_PATHS);
  });

  it("revalidates every catalog page after a delete", () => {
    revalidateCatalogAfterDelete(hookArgs());

    expect(vi.mocked(revalidatePath).mock.calls).toEqual(CATALOG_PATHS);
  });

  it("returns the document untouched", () => {
    const args = hookArgs() as { doc: unknown };

    expect(revalidateCatalogAfterChange(args as never)).toBe(args.doc);
  });

  it("skips revalidation when the context disables it", () => {
    revalidateCatalogAfterChange(hookArgs({ disableRevalidate: true }));
    revalidateCatalogAfterDelete(hookArgs({ disableRevalidate: true }));

    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
