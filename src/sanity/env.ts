export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== undefined && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "" && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
