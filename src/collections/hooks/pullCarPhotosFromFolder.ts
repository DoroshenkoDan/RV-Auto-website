import type { CollectionBeforeValidateHook } from "payload";

import type { Car } from "@/payload-types";

const CAR_MEDIA_SLUG = "car-media";
const MAX_PHOTOS_PER_FOLDER = 500;

function idOf(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "id" in value) {
    const { id } = value as { id: unknown };
    return typeof id === "number" ? id : null;
  }
  return null;
}

function idsOf(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return value.map(idOf).filter((id): id is number => id !== null);
}

export const pullCarPhotosFromFolder: CollectionBeforeValidateHook<
  Car
> = async ({ data, originalDoc, req }) => {
  if (!data) return data;

  const folderId = idOf(data.photoFolder ?? originalDoc?.photoFolder);
  if (!folderId) return data;

  const gallery = idsOf(data.gallery ?? originalDoc?.gallery);
  const folderChanged = folderId !== idOf(originalDoc?.photoFolder);

  if (!folderChanged && gallery.length > 0) return data;

  const inFolder = await req.payload.find({
    collection: CAR_MEDIA_SLUG,
    where: { folder: { equals: folderId } },
    sort: "filename",
    limit: MAX_PHOTOS_PER_FOLDER,
    depth: 0,
    req,
  });

  const merged = [...gallery];
  for (const photo of inFolder.docs) {
    if (!merged.includes(photo.id)) merged.push(photo.id);
  }

  return { ...data, gallery: merged };
};
