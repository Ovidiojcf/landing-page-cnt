import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/get-dictionary";
import { InfoPage } from "@/components/pages/InfoPage";
import { getRouteTitle } from "@/lib/page-content";

interface SocialProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang);
  return Object.keys(dict.pages.socialProjects.routes).map((slug) => ({ slug }));
}

async function getSocialProjectPageData(
  params: SocialProjectPageProps["params"],
) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const title = getRouteTitle(dict.pages.socialProjects.routes, slug);
  if (!title) notFound();

  return { lang, dict, title };
}

export async function generateMetadata({
  params,
}: SocialProjectPageProps): Promise<Metadata> {
  const { dict, title } = await getSocialProjectPageData(params);
  return {
    title: `${title} | ${dict.header.title}`,
    description: dict.pages.socialProjects.description,
  };
}

export default async function SocialProjectPage({
  params,
}: SocialProjectPageProps) {
  const { lang, dict, title } = await getSocialProjectPageData(params);

  return (
    <InfoPage
      lang={lang}
      categoryTitle={dict.pages.socialProjects.categoryTitle}
      title={title}
      description={dict.pages.socialProjects.description}
      contactAction={dict.pages.socialProjects.contactAction}
    />
  );
}
