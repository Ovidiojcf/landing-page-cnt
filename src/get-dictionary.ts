import type ptBrDictionary from "./dictionaries/pt-br.json";

export const locales = ["pt-br", "en-us"] as const;

export type Locale = (typeof locales)[number];

export type Dictionary = typeof ptBrDictionary;

export const defaultLocale: Locale = "pt-br";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  "pt-br": () =>
    import("./dictionaries/pt-br.json").then((module) => module.default),
  "en-us": () =>
    import("./dictionaries/en-us.json").then((module) => module.default),
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  const resolvedLocale = isValidLocale(locale) ? locale : defaultLocale;
  return dictionaries[resolvedLocale]();
}
