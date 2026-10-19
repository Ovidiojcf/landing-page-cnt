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

  const displayedAwards = [
    { data: previousAward, offset: -1 },
    { data: activeAward, offset: 0 },
    { data: nextAward, offset: 1 },
  ];

  return (
    <section
      aria-labelledby="awards-title"
      className="bg-stone-50 px-4 py-14 text-slate-900 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center sm:mb-14">
          <h2 id="awards-title" className="font-metropolis text-3xl sm:text-4xl">
            {dict.title}
          </h2>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Coluna Esquerda: Texto Descritivo e Controles */}
          <div className="flex flex-col gap-8">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              {dict.description}
            </p>

            {totalAwards > 1 && (
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => showAward(activeIndex - 1)}
                  aria-label={dict.navigation.previous}
                  className="flex size-11 items-center justify-center rounded-full border border-blue-950/20 text-blue-950 transition-colors hover:bg-blue-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
                >
                  <ArrowIcon previous />
                </button>

                <button
                  type="button"
                  onClick={() => showAward(activeIndex + 1)}
                  aria-label={dict.navigation.next}
                  className="flex size-11 items-center justify-center rounded-full border border-blue-950/20 text-blue-950 transition-colors hover:bg-blue-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
                >
                  <ArrowIcon />
                </button>

                <span className="text-xs font-semibold tabular-nums text-slate-500">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(totalAwards).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          {/* Coluna Direita: Exibição dos Cards (Anterior - Destaque - Próximo) */}
          <div
            className="grid items-center gap-4 sm:gap-6 lg:grid-cols-[1fr_1.5fr_1fr]"
            aria-live="polite"
          >
            {displayedAwards.map(({ data: award, offset }) => {
              const isFeatured = offset === 0;
              const targetIndex = (activeIndex + offset + totalAwards) % totalAwards;

              return (
                <button
                  key={`${award.image}-${offset}`}
                  type="button"
                  onClick={() => showAward(targetIndex)}
                  aria-label={award.name}
                  aria-current={isFeatured ? "true" : undefined}
                  className={`flex flex-col items-center text-center transition-all duration-300 ${
                    isFeatured
                      ? "py-4 text-blue-950"
                      : "hidden scale-90 text-slate-500 opacity-60 hover:scale-95 hover:opacity-80 lg:flex"
                  }`}
                >
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
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}