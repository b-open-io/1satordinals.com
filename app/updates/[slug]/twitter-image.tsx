// Re-export the OpenGraph image as Twitter image
export { alt, contentType, default, size } from "./opengraph-image";

// Runtime must be defined directly, not re-exported
export const runtime = "edge";
