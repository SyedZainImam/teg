import { defineField, defineType } from "sanity";

export const contactMessage = defineType({
  name: "contactMessage",
  title: "Contact Messages",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone / WhatsApp",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "equipmentInterest",
      title: "Equipment Interest",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "read",
      title: "Read",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "equipmentInterest",
      read: "read",
    },
    prepare({ title, subtitle, read }) {
      return {
        title: `${read ? "" : "● "}${title || "Unknown"}`,
        subtitle: subtitle || "General Inquiry",
      };
    },
  },
});
