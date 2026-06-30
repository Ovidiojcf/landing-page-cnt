import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/get-dictionary";
import "../globals.css";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  // Exemplo futuro: const dictionary = await getDictionary(lang);
  // return { title: dictionary.header.title };

  return {};
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;

  // Fetch do dicionário: descomente quando for consumir traduções neste layout
  // ou passe `dictionary` via React Context para os componentes filhos.
  // const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
