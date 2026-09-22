"use client";

import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { AUCTION_GROUPS } from "@/lib/calculator/options";
import type { AuctionType } from "@/lib/calculator/types";
import { FIELD_ROOT, fieldControl, fieldLabel } from "@/ui/field";

export function AuctionField({
  name,
  label,
  value,
  onValueChange,
  className,
}: {
  name: string;
  label: string;
  value: AuctionType;
  onValueChange: (value: AuctionType) => void;
  className?: string;
}) {
  const tRegions = useTranslations("homePage.calculator.form.auction.regions");
  const tPlatforms = useTranslations("services.platforms");

  const items = AUCTION_GROUPS.flatMap(({ auctions }) =>
    auctions.map((auction) => ({
      value: auction,
      label: tPlatforms(`${auction}.name`),
    })),
  );

  return (
    <Field.Root name={name} className={className}>
      <Select.Root<AuctionType>
        items={items}
        value={value}
        onValueChange={(next) => {
          if (next) onValueChange(next);
        }}
      >
        <div className={FIELD_ROOT}>
          <Select.Label className={fieldLabel()}>{label}</Select.Label>

          <Select.Trigger
            className={fieldControl({
              className:
                "flex cursor-pointer items-center justify-between gap-x-3 text-left data-popup-open:border-brand",
            })}
          >
            <Select.Value />
            <Select.Icon className="flex text-ink-muted">
              <ChevronDown aria-hidden className="size-4" />
            </Select.Icon>
          </Select.Trigger>
        </div>

        <Select.Portal>
          <Select.Positioner sideOffset={4} className="z-40 outline-none">
            <Select.Popup className="max-h-[min(22rem,var(--available-height))] w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-sm border border-line bg-white py-1 shadow-[0_12px_32px_--alpha(var(--color-night)/12%)] transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 motion-reduce:transition-none">
              <Select.List className="max-h-[inherit] overflow-y-auto">
                {AUCTION_GROUPS.map(({ region, auctions }) => (
                  <Select.Group key={region}>
                    <Select.GroupLabel className="px-4 pt-3 pb-1 text-caption font-semibold tracking-[0.12em] text-ink-muted uppercase">
                      {tRegions(region)}
                    </Select.GroupLabel>

                    {auctions.map((auction) => (
                      <Select.Item
                        key={auction}
                        value={auction}
                        className="grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-x-2 px-4 py-2 text-body text-ink outline-none data-highlighted:bg-surface"
                      >
                        <Select.ItemIndicator className="col-start-1 flex text-brand">
                          <Check aria-hidden className="size-4" />
                        </Select.ItemIndicator>
                        <Select.ItemText className="col-start-2">
                          {tPlatforms(`${auction}.name`)}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  );
}
