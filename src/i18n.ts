export const locales = ["pt-br", "en-us"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-br";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getPreferredLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(",")
    .map((entry) => {
      const [code, qualityValue] = entry.trim().split(";q=");
      return {
        code: code.toLowerCase(),
        quality: qualityValue ? Number.parseFloat(qualityValue) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    if (code.startsWith("pt")) return "pt-br";
    if (code.startsWith("en")) return "en-us";
  }

  return defaultLocale;
}
