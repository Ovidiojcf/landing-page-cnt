import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { locales, type Locale } from "@/get-dictionary";

export interface SocialProjectContent {
  title: string;
  hookTitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  content: string;
}

export interface SocialProjectNavigationItem {
  slug: string;
  title: string;
}

const socialProjectsDirectory = (locale: Locale) =>
  join(process.cwd(), "src", "content", locale, "projetos-sociais");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getOptionalString(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
): string | undefined {
  const value = data[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid "${key}" in social project Markdown: ${filePath}`);
  }
  return value.trim();
}

function parseSocialProject(
  markdown: string,
  filePath: string,
): SocialProjectContent {
  const parsed = matter(markdown);
  if (!isRecord(parsed.data)) {
    throw new Error(`Invalid frontmatter in social project Markdown: ${filePath}`);
  }

  const title = getOptionalString(parsed.data, "title", filePath);
  if (!title) {
    throw new Error(`Missing "title" in social project Markdown: ${filePath}`);
  }

  const hookTitle = getOptionalString(parsed.data, "hookTitle", filePath);
  const description = getOptionalString(parsed.data, "description", filePath);
  const image = getOptionalString(parsed.data, "image", filePath);
  const imageAlt = getOptionalString(parsed.data, "imageAlt", filePath);

  if (image && (!image.startsWith("/") || image.startsWith("//"))) {
    throw new Error(`Social project image must be a site path: ${filePath}`);
  }
  if (image && !imageAlt) {
    throw new Error(`Missing "imageAlt" for social project image: ${filePath}`);
  }
  if (!image && imageAlt) {
    throw new Error(
      `"imageAlt" requires an "image" in social project Markdown: ${filePath}`,
    );
  }

  return {
    title,
    hookTitle,
    description,
    image,
    imageAlt,
    content: parsed.content.trim(),
  };
}

function isSocialProjectSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

async function readSocialProjects(
  locale: Locale,
): Promise<SocialProjectNavigationItem[]> {
  const directory = socialProjectsDirectory(locale);
  const files = await readdir(directory, { withFileTypes: true });
  const markdownFiles = files
    .filter((file) => file.isFile() && file.name.endsWith(".md"))
    .sort((a, b) => a.name.localeCompare(b.name));

  return Promise.all(
    markdownFiles.map(async (file) => {
      const slug = file.name.slice(0, -".md".length);
      if (!isSocialProjectSlug(slug)) {
        throw new Error(`Invalid social project slug in filename: ${file.name}`);
      }

      const filePath = join(directory, file.name);
      const markdown = await readFile(filePath, "utf8");
      const project = parseSocialProject(markdown, filePath);
      return { slug, title: project.title };
    }),
  );
}

export async function getSocialProjects(
  locale: Locale,
): Promise<SocialProjectNavigationItem[]> {
  const localizedProjects = await Promise.all(
    locales.map(async (localizedLocale) => ({
      locale: localizedLocale,
      projects: await readSocialProjects(localizedLocale),
    })),
  );
  const expectedSlugs = new Set(
    localizedProjects[0].projects.map((project) => project.slug),
  );

  for (
    const { locale: localizedLocale, projects } of localizedProjects.slice(1)
  ) {
    const localizedSlugs = new Set(projects.map((project) => project.slug));
    const missingSlugs = [...expectedSlugs].filter(
      (slug) => !localizedSlugs.has(slug),
    );
    const additionalSlugs = [...localizedSlugs].filter(
      (slug) => !expectedSlugs.has(slug),
    );

    if (missingSlugs.length || additionalSlugs.length) {
      throw new Error(
        `Social project Markdown slugs must match across locales. ` +
          `Missing in ${localizedLocale}: ${missingSlugs.join(", ") || "none"}; ` +
          `additional in ${localizedLocale}: ${additionalSlugs.join(", ") || "none"}.`,
      );
    }
  }

  const selectedLocale = localizedProjects.find(
    (localized) => localized.locale === locale,
  );
  if (!selectedLocale) {
    throw new Error(`Social projects not loaded for locale: ${locale}`);
  }

  return selectedLocale.projects;
}

export async function getSocialProject(
  locale: Locale,
  slug: string,
): Promise<SocialProjectContent | undefined> {
  if (!isSocialProjectSlug(slug)) return undefined;

  const filePath = join(socialProjectsDirectory(locale), `${slug}.md`);
  let markdown: string;
  try {
    markdown = await readFile(filePath, "utf8");
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return undefined;
    }
    throw error;
  }

  return parseSocialProject(markdown, filePath);
}
