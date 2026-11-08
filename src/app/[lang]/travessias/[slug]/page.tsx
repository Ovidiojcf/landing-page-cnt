import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/get-dictionary";
import { InfoPage } from "@/components/pages/InfoPage";
import { getRouteTitle } from "@/lib/page-content";

interface JourneyPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang);
  return Object.keys(dict.pages.journeys.routes).map((slug) => ({ slug }));
}

async function getJourneyPageData(params: JourneyPageProps["params"]) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const title = getRouteTitle(dict.pages.journeys.routes, slug);
  if (!title) notFound();

  return { lang, dict, title };
}

export async function generateMetadata({
  params,
}: JourneyPageProps): Promise<Metadata> {
  const { dict, title } = await getJourneyPageData(params);
  return {
    title: `${title} | ${dict.header.title}`,
    description: dict.pages.journeys.description,
  };
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { lang, dict, title } = await getJourneyPageData(params);

  return (
    <InfoPage
      lang={lang}
      categoryTitle={dict.pages.journeys.categoryTitle}
      title={title}
      description={dict.pages.journeys.description}
      contactAction={dict.pages.journeys.contactAction}
    />
  );
}
