import type ptBrDictionary from "./dictionaries/pt-br.json";
import { defaultLocale, isValidLocale, type Locale } from "./i18n";

export { defaultLocale, isValidLocale, locales, type Locale } from "./i18n";

export type Dictionary = typeof ptBrDictionary;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  "pt-br": () =>
    import("./dictionaries/pt-br.json").then((module) => module.default),
  "en-us": () =>
    import("./dictionaries/en-us.json").then((module) => module.default),
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  const resolvedLocale = isValidLocale(locale) ? locale : defaultLocale;
  return dictionaries[resolvedLocale]();
}
