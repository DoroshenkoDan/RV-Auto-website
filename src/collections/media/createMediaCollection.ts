import type { CollectionConfig } from "payload";

interface CreateMediaCollectionArgs {
  slug: string;
  labels: { singular: string; plural: string };
  staticDir: string;
  folders?: boolean;
}

export function createMediaCollection({
  slug,
  labels,
  staticDir,
  folders = false,
}: CreateMediaCollectionArgs): CollectionConfig {
  return {
    slug,
    labels,
    access: { read: () => true },
    admin: { group: "Media" },
    folders,
    upload: {
      staticDir,
      mimeTypes: ["image/*"],
    },
    fields: [
      {
        name: "alt",
        type: "text",
        localized: true,
      },
    ],
  };
}
