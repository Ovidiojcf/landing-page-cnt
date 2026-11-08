import Link from "next/link";
import type { Locale } from "@/get-dictionary";

interface InfoPageProps {
  lang: Locale;
  categoryTitle: string;
  title: string;
  description: string;
  contactAction: string;
}

export function InfoPage({
  lang,
  categoryTitle,
  title,
  description,
  contactAction,
}: InfoPageProps) {
  return (
    <main>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-sky-800">
            {categoryTitle}
          </p>
          <h1 className="font-metropolis text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            {description}
          </p>
          <Link
            href={`/${lang}/contato`}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#111e2e] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111e2e]"
          >
            {contactAction}
          </Link>
        </div>
      </section>
    </main>
  );
}
