import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (Primary)",
      type: "string",
      description: "Include country code, e.g. 923001234567 (no + or spaces)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappNumber2",
      title: "WhatsApp Number (Secondary)",
      type: "string",
      description: "Optional second number. Include country code, e.g. 923007654321 (no + or spaces)",
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
