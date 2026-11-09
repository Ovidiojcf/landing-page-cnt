This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Social project pages

Each published social project is a Markdown file for each supported locale:

```text
src/content/
  pt-br/projetos-sociais/<slug>.md
  en-us/projetos-sociais/<slug>.md
```

The filename becomes the URL slug. Add the page title and optional page metadata
to the frontmatter; keep the article body below the closing `---`:

```md
---
title: "Project title"
hookTitle: "Optional headline shown above the article"
description: "Optional page description used for search previews."
image: "/photos/project-image.webp"
imageAlt: "Alternative text describing the image."
---

## Article heading

Write the localized article here.
```

`title` is required. `hookTitle` and `description` are optional. `image` and
`imageAlt` must be provided together. Add matching Markdown files for both
locales; the build validates the frontmatter and matching slugs. Published
projects are added automatically to the route and the desktop and mobile
navigation. A file with a title but no article body uses the standard contact
page layout until its article is written.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
