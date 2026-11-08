"use client";

import Image from "next/image";
import { useState } from "react";

interface Award {
  name: string;
  image: string;
  alt: string;
  description: string;
}

interface AwardsDictionary {
  title: string;
  description: string;
  items: Award[];
  navigation: {
    previous: string;
    next: string;
    progress?: string;
  };
}

interface AwardsProps {
  dict: AwardsDictionary;
}

function ArrowIcon({ previous = false }: { previous?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`size-5 ${previous ? "rotate-180" : ""}`}
    >
      <path
        d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Awards({ dict }: AwardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalAwards = dict.items.length;

  if (totalAwards === 0) return null;

  // Função auxiliar limpa para navegação circular (loop)
  const getAward = (offset: number) =>
    dict.items[(activeIndex + offset + totalAwards) % totalAwards];

  const previousAward = getAward(-1);
  const activeAward = dict.items[activeIndex];
  const nextAward = getAward(1);

  const showAward = (index: number) => {
    setActiveIndex((index + totalAwards) % totalAwards);
  };

  const displayedAwards =
    totalAwards > 1
      ? [
          { data: previousAward, offset: -1 },
          { data: activeAward, offset: 0 },
          { data: nextAward, offset: 1 },
        ]
      : [{ data: activeAward, offset: 0 }];

  return (
    <section
      aria-labelledby="awards-title"
      className="bg-stone-50 px-4 py-14 text-slate-900 sm:px-6 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-6 max-w-3xl text-center sm:mb-6">
          <h2
            id="awards-title"
            className="font-metropolis text-2xl font-bold leading-tight tracking-tight sm:text-2xl"
          >
            {dict.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {dict.description}
          </p>
        </header>

        <div className="mx-auto max-w-5xl">
          <div
            id="awards-carousel"
            className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,1.5fr)_minmax(0,1fr)] lg:gap-8"
            aria-live="polite"
            aria-atomic="true"
          >
            {displayedAwards.map(({ data: award, offset }) => {
              const isFeatured = offset === 0;
              const targetIndex = (activeIndex + offset + totalAwards) % totalAwards;
              const content = (
                <>
                  <Image
                    src={award.image}
                    alt={award.alt}
                    width={isFeatured ? 176 : 100}
                    height={isFeatured ? 176 : 100}
                    className={
                      isFeatured
                        ? "size-36 object-contain sm:size-44"
                        : "size-20 object-contain sm:size-24"
                    }
                  />

                  <span
                    className={`mt-3 font-metropolis font-bold ${
                      isFeatured
                        ? "text-xl text-blue-950 sm:text-2xl"
                        : "text-xs text-slate-500 sm:text-sm"
                    }`}
                  >
                    {award.name}
                  </span>

                  {isFeatured && (
                    <p className="mt-2 max-w-sm text-sm font-normal leading-relaxed text-slate-600 sm:text-base">
                      {award.description}
                    </p>
                  )}
                </>
              );

              return isFeatured ? (
                <article
                  key={`${award.image}-${offset}`}
                  aria-current="true"
                  className="flex flex-col items-center py-4 text-center text-blue-950"
                >
                  {content}
                </article>
              ) : (
                <button
                  key={`${award.image}-${offset}`}
                  type="button"
                  onClick={() => showAward(targetIndex)}
                  aria-label={award.name}
                  className="hidden scale-90 flex-col items-center text-center text-slate-500 opacity-60 transition-all duration-300 hover:scale-95 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-950 lg:flex"
                >
                  {content}
                </button>
              );
            })}
          </div>

          {totalAwards > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => showAward(activeIndex - 1)}
                aria-label={dict.navigation.previous}
                aria-controls="awards-carousel"
                className="flex size-11 items-center justify-center rounded-full border border-blue-950/20 text-blue-950 transition-colors hover:bg-blue-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
              >
                <ArrowIcon previous />
              </button>

              <span className="text-xs font-semibold tabular-nums text-slate-500">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(totalAwards).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => showAward(activeIndex + 1)}
                aria-label={dict.navigation.next}
                aria-controls="awards-carousel"
                className="flex size-11 items-center justify-center rounded-full border border-blue-950/20 text-blue-950 transition-colors hover:bg-blue-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
              >
                <ArrowIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}