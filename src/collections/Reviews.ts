import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  access: { read: () => true },
  labels: { singular: "Review", plural: "Reviews" },
  admin: {
    useAsTitle: "authorName",
    defaultColumns: [
      "authorName",
      "carLabel",
      "deliveryDays",
      "date",
      "featured",
      "order",
    ],
  },
  defaultSort: "order",
  fields: [
    {
      name: "authorName",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "city",
      type: "text",
      localized: true,
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Photo of the client with the delivered car",
      },
    },
    {
      name: "carLabel",
      type: "text",
      required: true,
      admin: {
        description: 'Car the review is about, e.g. "Toyota RAV4 XLE, 2019"',
      },
    },
    {
      name: "deliveryDays",
      type: "number",
      admin: {
        description: "Days from the auction bid to the handover",
      },
    },
    {
      name: "date",
      type: "date",
      admin: {
        date: { pickerAppearance: "monthOnly", displayFormat: "MMMM yyyy" },
        description: "Month the car was handed over",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show this review in the homepage slider",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers come first",
      },
    },
  ],
};
