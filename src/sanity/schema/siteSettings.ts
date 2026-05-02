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
      description: "Include country code, e.g. 14165551234 (no + or spaces)",
      validation: (rule) => rule.required(),
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
