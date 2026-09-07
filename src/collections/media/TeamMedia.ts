import { createMediaCollection } from "./createMediaCollection";

export const TeamMedia = createMediaCollection({
  slug: "team-media",
  labels: { singular: "Team photo", plural: "Team photos" },
  staticDir: "media/team",
});
