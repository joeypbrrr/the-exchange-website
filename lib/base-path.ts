export const basePath = "/the-exchange-website";

export function asset(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${clean}`;
}
