export function getRouteTitle<T extends object>(
  routes: T,
  slug: string,
): string | undefined {
  if (!Object.prototype.hasOwnProperty.call(routes, slug)) {
    return undefined;
  }

  const title = routes[slug as keyof T];
  return typeof title === "string" ? title : undefined;
}
