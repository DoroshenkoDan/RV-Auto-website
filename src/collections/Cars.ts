import type { CollectionConfig } from "payload";

export const Cars: CollectionConfig = {
  slug: "cars",
  access: { read: () => true },
  admin: { useAsTitle: "title" },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) return value;
            const title = siblingData?.title;
            if (!title) return value;
            return title
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
          },
        ],
      },
    },
    {
      name: "vin",
      type: "text",
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "features",
      type: "array",
      labels: { singular: "Feature", plural: "Features" },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Available", value: "available" },
        { label: "In transit", value: "inTransit" },
        { label: "Auction", value: "auction" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show this car in the homepage preview",
      },
    },
    {
      name: "gallery",
      type: "array",
      labels: { singular: "Photo", plural: "Photos" },
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "year",
      type: "number",
      required: true,
    },
    {
      name: "mileageKm",
      type: "number",
      required: true,
    },
    {
      name: "engine",
      type: "text",
      required: true,
    },
    {
      name: "drivetrain",
      type: "select",
      required: true,
      options: [
        { label: "AWD", value: "AWD" },
        { label: "4WD", value: "4WD" },
        { label: "FWD", value: "FWD" },
        { label: "RWD", value: "RWD" },
      ],
    },
    {
      name: "transmission",
      type: "select",
      required: true,
      options: [
        { label: "Automatic", value: "automatic" },
        { label: "Manual", value: "manual" },
      ],
    },
    {
      name: "damageTag",
      type: "text",
      localized: true,
    },
    {
      name: "locationNote",
      type: "text",
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.status === "available",
      },
    },
    {
      name: "etaNote",
      type: "text",
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.status === "inTransit",
      },
    },
    {
      name: "auctionNote",
      type: "text",
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.status === "auction",
      },
    },
    {
      name: "currentBid",
      type: "number",
      admin: {
        condition: (_, siblingData) => siblingData.status === "auction",
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
  ],
};
