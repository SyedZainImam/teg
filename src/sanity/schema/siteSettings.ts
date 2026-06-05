import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Include country code without +, e.g. 19058080705",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Contact Phone Number 1",
      type: "string",
      description: "e.g. +1 905 808 0705",
    }),
    defineField({
      name: "phoneNumber2",
      title: "Contact Phone Number 2",
      type: "string",
      description: "e.g. +1 226 821 5534",
    }),
    defineField({
      name: "heroImages",
      title: "Hero Slideshow Images",
      type: "array",
      description: "Images rotate automatically on the homepage hero. Add 3–6 for best effect.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
          preview: {
            select: { media: "image", title: "alt" },
            prepare({ media, title }) {
              return { media, title: (title as string) || "Hero image" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
