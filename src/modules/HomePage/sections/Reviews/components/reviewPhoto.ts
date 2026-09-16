import type { Review } from "@/payload-types";

export function reviewPhotoUrl(photo: Review["photo"]) {
  return typeof photo === "object" && photo?.url ? photo.url : null;
}
