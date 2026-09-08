import { createMediaCollection } from "./createMediaCollection";

export const ReviewMedia = createMediaCollection({
  slug: "review-media",
  labels: { singular: "Review photo", plural: "Review photos" },
  staticDir: "media/reviews",
  folders: true,
});
