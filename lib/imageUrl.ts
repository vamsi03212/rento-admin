import { NEXT_PUBLIC_ADMIN_URL } from "./url";

export const getImageUrl = (path?: string | null): { uri: string } => {
  const fallback = "https://www.gravatar.com/avatar/?d=mp";

  if (!path) return { uri: fallback };

  if (path.startsWith("http") || path.startsWith("file://")) {
    return { uri: path };
  }

  const cleanBase = NEXT_PUBLIC_ADMIN_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return { uri: `${cleanBase}${cleanPath}` };
};
