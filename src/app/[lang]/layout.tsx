import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale, getDictionary } from "@/get-dictionary";
import "../globals.css";
import { Header } from "@/components/layout/Header";

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

  const dictionary = await getDictionary(lang as Locale);
  return { title: dictionary.header.title };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>  
        <Header lang={locale} dict={dictionary.header} />
        {children}
      </body>
    </html>
  );
}
