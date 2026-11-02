interface HeroDictionary {
  title_highlight: string;
  title: string;
  title_sub_01: string;
  title_sub_02: string;
  title_sub_03: string;
}

interface HeroProps {
  dict: HeroDictionary;
}

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 py-16 text-center md:min-h-[calc(100svh-4.5rem)] md:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-position-[50%_58%] md:bg-position-[50%_62%]"
        style={{ backgroundImage: "url('/FB_VALENTINA_02.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-br from-red-950/65 via-red-900/40 to-violet-950/70"
      />

      <div
        className="flex w-full max-w-5xl flex-col items-center gap-1 tracking-wider"
        role="heading"
        aria-level={1}
      >
        <div className="relative inline-block my-1">
          <div className="absolute -inset-y-1 -inset-x-1 border border-white/60 pointer-events-none -rotate-1 z-0"></div>

          <div className="relative z-10 w-fit max-w-full bg-red-500 px-2 py-0.5 text-3xl  font-metropolis  text-white shadow-lg rotate-0.5 sm:px-4 sm:py-0 sm:text-4xl md:text-5xl">
            {dict.title_highlight}
          </div>
        </div>

        <div className="relative inline-block my-1">
          <div className="absolute -inset-1 border border-white/60 pointer-events-none -rotate-1 z-0"></div>

          <div className="relative z-10 w-fit max-w-full bg-slate-900 px-2 py-0.5 text-2xl  font-metropolis  text-white shadow-lg rotate-0.5 sm:px-4 sm:py-0 sm:text-3xl md:text-5xl">
            {dict.title}
          </div>
        </div>

        {/* Subtítulos */}
        <div className="relative inline-block my-1">
           <div className="absolute -inset-1 border border-white/60 pointer-events-none -rotate-2 z-0"></div>
          <div className="mt-0 w-fit max-w-full bg-white px-2 py-0.5 text-xl  font-nexa font-bold text-blue-950 shadow-lg sm:px-4 sm:py-0 sm:text-2xl md:text-3xl">
            {dict.title_sub_01}
          </div>
        </div>

        <div className="relative inline-block my-1">
          <div className="absolute -inset-1 border border-white/60 pointer-events-none -rotate-2 z-0"></div>
          <div className="mt-0 w-fit max-w-full bg-white px-2 py-0.5 text-xl  font-nexa font-bold text-blue-950 shadow-lg sm:px-4 sm:py-0 sm:text-2xl md:text-3xl">
            {dict.title_sub_02}
          </div>
        </div>
        <div className="relative inline-block my-1">
          <div className="absolute -inset-1 border border-white/60 pointer-events-none -rotate-2 z-0"></div>
          <div className="mt-0 w-fit max-w-full bg-white px-2 py-0.5 text-xl  font-nexa font-bold text-blue-950 shadow-lg sm:px-4 sm:py-0 sm:text-2xl md:text-3xl">
            {dict.title_sub_03}
          </div>
        </div>
      </div>
    </section>
  );
}
