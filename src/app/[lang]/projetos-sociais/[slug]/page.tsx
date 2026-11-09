import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/get-dictionary";
import { InfoPage } from "@/components/pages/InfoPage";
import { LuzeiroProjectPage } from "@/components/pages/LuzeiroProjectPage";
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

  const content =
    slug === "luzeiro-xxix"
      ? await readFile(
          join(
            process.cwd(),
            "src",
            "content",
            lang,
            "projetos-sociais",
            "luzeiro-xxix.md",
          ),
          "utf8",
        )
      : undefined;

  return { lang, dict, title, content };
}

export async function generateMetadata({
  params,
}: SocialProjectPageProps): Promise<Metadata> {
  const { dict, title, content } = await getSocialProjectPageData(params);
  return {
    title: `${title} | ${dict.header.title}`,
    description:
      content === undefined
        ? dict.pages.socialProjects.description
        : dict.pages.socialProjects.luzeiroDescription,
  };
}

export default async function SocialProjectPage({
  params,
}: SocialProjectPageProps) {
  const { lang, dict, title, content } = await getSocialProjectPageData(params);

  if (content !== undefined) {
    return (
      <LuzeiroProjectPage
        hookTitle={dict.pages.socialProjects.luzeiroHookTitle}
        content={content}
        imageAlt={dict.pages.socialProjects.luzeiroImageAlt}
      />
    );
  }

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
