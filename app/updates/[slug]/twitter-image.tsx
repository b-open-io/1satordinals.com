// Re-export the OpenGraph image as Twitter image
export { default } from "./opengraph-image";
export { size, contentType, alt } from "./opengraph-image";

// Runtime must be defined directly, not re-exported
export const runtime = "edge";