import { SectionActivity } from "@/components/layout/SectionActivity";
import {
  locales,
  isValidLocale,
  getDictionary,
  Locale,
} from "@/get-dictionary";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

export default async function Home({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }
  // className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
  // className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"
  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);
  return (
    <div>
      <main>
        <SectionActivity
          lang={locale}
          dict={dictionary.company}
        ></SectionActivity>
      </main>
    </div>
  );
}
