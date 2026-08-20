import type { CollectionConfig } from "payload";

export const Team: CollectionConfig = {
  slug: "team",
  access: { read: () => true },
  labels: { singular: "Team member", plural: "Team" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "startYear", "carsDelivered", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "startYear",
      type: "number",
      required: true,
      admin: {
        description: "Year the person started working in car import",
      },
    },
    {
      name: "carsDelivered",
      type: "number",
      required: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers come first on the About page",
      },
    },
  ],
};
