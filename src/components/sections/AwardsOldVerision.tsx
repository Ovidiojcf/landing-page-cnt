"use client";

import Image from "next/image";
import { useState } from "react";

interface Award {
  name: string;
  image: string;
  alt: string;
  description: string;
}

interface AwardOldVersionDictionary {
  title: string;
  description: string;
  items: Award[];
  navigation: {
    previous: string;
    next: string;
    progress?: string;
  };
}

interface AwardsOldVersionProps {
  dict: AwardOldVersionDictionary;
}

function ArrowIcon({ previous = false }: { previous?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-5 w-5 ${previous ? "rotate-180" : ""}`}
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

export function AwardsOldVersion({ dict }: AwardsOldVersionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalAwards = dict.items.length;

  if (totalAwards === 0) return null;

  const activeAward = dict.items[activeIndex];
  const previousAward = dict.items[(activeIndex - 1 + totalAwards) % totalAwards];
  const nextAward = dict.items[(activeIndex + 1) % totalAwards];
  const progress = ((activeIndex + 1) / totalAwards) * 100;

  function showAward(index: number) {
    setActiveIndex((index + totalAwards) % totalAwards);
  }

  return (
    <section
      aria-labelledby="awards-title"
      className="bg-stone-50 px-4 py-14 text-slate-900 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col items-center gap-6 text-center sm:mb-14">
          <h2 id="awards-title" className="font-metropolis text-3xl sm:text-4xl">
            {dict.title}
          </h2>
          <div
            aria-label={dict.title}
            className="flex max-w-full flex-wrap justify-center gap-2"
          >
            {dict.items.map((award, index) => (
              <button
                key={award.image}
                type="button"
                onClick={() => showAward(index)}
                aria-pressed={index === activeIndex}
                className={`max-w-full rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  index === activeIndex
                    ? "bg-blue-950 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-blue-50 hover:text-blue-950"
                }`}
              >
                {award.name}
              </button>
            ))}
          </div>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              {dict.description}
            </p>

            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => showAward(activeIndex - 1)}
                  disabled={totalAwards < 2}
                  aria-label={dict.navigation.previous}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-950/20 text-blue-950 transition-colors hover:bg-blue-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowIcon previous />
                </button>
                <button
                  type="button"
                  onClick={() => showAward(activeIndex + 1)}
                  disabled={totalAwards < 2}
                  aria-label={dict.navigation.next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-950/20 text-blue-950 transition-colors hover:bg-blue-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowIcon />
                </button>
              </div>

              <div className="flex min-w-28 flex-col gap-2">
                <span className="text-right text-xs font-semibold tabular-nums text-slate-500">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(totalAwards).padStart(2, "0")}
                </span>
                <div
                  className="h-1 overflow-hidden rounded-full bg-slate-200"
                  role="progressbar"
                  aria-label={dict.navigation.progress ?? "Progresso de premiações"}
                  aria-valuemin={1}
                  aria-valuemax={totalAwards}
                  aria-valuenow={activeIndex + 1}
                >
                  <div
                    className="h-full rounded-full bg-blue-950 transition-[width] duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]"
            aria-live="polite"
          >
            {[previousAward, activeAward, nextAward].map((award, position) => {
              const isFeatured = position === 1;
              const awardIndex =
                (activeIndex + position - 1 + totalAwards) % totalAwards;

              return (
                <button
                  key={`${award.image}-${position}`}
                  type="button"
                  onClick={() => showAward(awardIndex)}
                  aria-label={award.name}
                  aria-current={isFeatured ? "true" : undefined}
                  className={`flex flex-col items-center gap-4 text-center transition-all duration-300 ${
                    isFeatured
                      ? "order-first py-4 text-blue-950 lg:order-0"
                      : "hidden scale-90 text-slate-500 opacity-60 hover:scale-95 hover:opacity-80 lg:flex"
                  }`}
                >
                  <Image
                    src={award.image}
                    alt={award.alt}
                    width={isFeatured ? 176 : 133}
                    height={isFeatured ? 176 : 134}
                    className={
                      isFeatured
                        ? "h-36 w-36 object-contain sm:h-44 sm:w-44"
                        : "h-24 w-24 object-contain"
                    }
                  />
                  <span
                    className={
                      isFeatured
                        ? "font-metropolis text-xl sm:text-2xl"
                        : "font-metropolis text-sm"
                    }
                  >
                    {award.name}
                  </span>
                  {isFeatured && (
                    <span className="max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base">
                      {award.description}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}