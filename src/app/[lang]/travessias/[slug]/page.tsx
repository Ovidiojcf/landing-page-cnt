import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/get-dictionary";
import { InfoPage } from "@/components/pages/InfoPage";
import { JourneyDetailPage } from "@/components/pages/JourneyDetailPage";
import { getJourneyData } from "@/data/journeys";
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
  const journey = getJourneyData(slug);
  const fallbackTitle = getRouteTitle(dict.pages.journeys.routes, slug);
  const title = journey?.content[lang].title ?? fallbackTitle;
  if (!title) notFound();

  const description =
    journey?.content[lang].description ?? dict.pages.journeys.description;

  return { lang, dict, title, journey, description };
}

export async function generateMetadata({
  params,
}: JourneyPageProps): Promise<Metadata> {
  const { dict, title, description } = await getJourneyPageData(params);
  return {
    title: `${title} | ${dict.header.title}`,
    description,
  };
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { lang, dict, title, journey, description } =
    await getJourneyPageData(params);

  if (journey) {
    return (
      <JourneyDetailPage
        categoryTitle={dict.pages.journeys.categoryTitle}
        title={title}
        description={description}
        labels={dict.pages.journeys.detail}
        journey={journey}
      />
    );
  }

  return (
    <InfoPage
      lang={lang}
      categoryTitle={dict.pages.journeys.categoryTitle}
      title={title}
      description={description}
      contactAction={dict.pages.journeys.contactAction}
    />
  );
}
