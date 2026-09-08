import { createMediaCollection } from "./createMediaCollection";

export const CarMedia = createMediaCollection({
  slug: "car-media",
  labels: { singular: "Car photo", plural: "Car photos" },
  staticDir: "media/cars",
  folders: true,
});
