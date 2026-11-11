import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  isValidLocale,
} from "@/get-dictionary";
import { InfoPage } from "@/components/pages/InfoPage";
import { SocialProjectArticlePage } from "@/components/pages/SocialProjectArticlePage";
import {
  getSocialProject,
  getSocialProjects,
} from "@/lib/social-projects";

interface SocialProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    throw new Error(`Invalid locale for social project routes: ${params.lang}`);
  }

  const projects = await getSocialProjects(params.lang);
  return projects.map(({ slug }) => ({ slug }));
}

async function getSocialProjectPageData(
  params: SocialProjectPageProps["params"],
) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const [dict, project] = await Promise.all([
    getDictionary(lang),
    getSocialProject(lang, slug),
  ]);
  if (!project) notFound();

  return { lang, dict, project };
}

export async function generateMetadata({
  params,
}: SocialProjectPageProps): Promise<Metadata> {
  const { dict, project } = await getSocialProjectPageData(params);
  return {
    title: `${project.title} | ${dict.header.title}`,
    description: project.description ?? dict.pages.socialProjects.description,
  };
}

export default async function SocialProjectPage({
  params,
}: SocialProjectPageProps) {
  const { lang, dict, project } = await getSocialProjectPageData(params);

  if (project.content) {
    return (
      <SocialProjectArticlePage
        title={project.title}
        hookTitle={project.hookTitle}
        content={project.content}
        image={project.image}
        imageAlt={project.imageAlt}
      />
    );
  }

  return (
    <InfoPage
      lang={lang}
      categoryTitle={dict.pages.socialProjects.categoryTitle}
      title={project.title}
      description={project.description ?? dict.pages.socialProjects.description}
      contactAction={dict.pages.socialProjects.contactAction}
    />
  );
}
