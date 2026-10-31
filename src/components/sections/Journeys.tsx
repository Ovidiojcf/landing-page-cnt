interface JourneyRoute {
  state: string;
  origin: string;
  destination: string;
}

interface JourneysDictionary {
  title: string;
  description: string;
  directionSeparator: string;
  schedulesLabel: string;
  routes: JourneyRoute[];
}

interface JourneysProps {
  dict: JourneysDictionary;
}

export function Journeys({ dict }: JourneysProps) {
  return (
    <section
      id="journeys"
      aria-labelledby="journeys-title"
      className="w-full overflow-hidden bg-[#c24242] px-3 py-12 text-white sm:px-6 sm:py-14"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mx-auto mb-7 max-w-3xl text-center sm:mb-9">
          <h2
            id="journeys-title"
            className="font-metropolis text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            {dict.title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-nexa text-sm font-light leading-relaxed text-white/95 sm:mt-3 sm:text-base">
            {dict.description}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {dict.routes.map((route) => (
            <article
              key={`${route.origin}-${route.destination}`}
              className="group flex min-w-0 flex-col rounded-xl bg-[#fdfbf7] p-3 text-[#17232f] shadow-[0_8px_20px_rgba(40,14,14,0.16)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(40,14,14,0.24)] sm:min-h-44 sm:p-4"
            >
              <p className="font-metropolis text-[10px] font-bold leading-snug text-[#c24242] sm:text-xs">
                {route.state}
              </p>
              <h3
                className="mt-3 flex min-w-0 flex-1 flex-col justify-center gap-2 font-metropolis text-sm font-bold leading-snug tracking-tight sm:mt-4 sm:gap-2.5 sm:text-base"
                aria-label={`${route.origin} ${dict.directionSeparator} ${route.destination}`}
              >
                <span className="wrap-break-word">{route.origin}</span>
                <span className="sr-only">
                  {dict.directionSeparator}
                </span>
                <span
                  className="flex w-full items-center gap-2 text-[#c24242]"
                  aria-hidden="true"
                >
                  <span className="size-2 shrink-0 rounded-full bg-current" />
                  <span className="h-0.5 min-w-0 flex-1 animate-[journeys-route-sailing_700ms_linear_infinite] bg-[repeating-linear-gradient(to_right,currentColor_0_6px,transparent_6px_18px)] motion-reduce:animate-none" />
                  <span className="size-2 shrink-0 rounded-full border-2 border-current" />
                </span>
                <span className="wrap-break-word">{route.destination}</span>
              </h3>
              <p className="mt-3 flex items-center gap-1 font-nexa text-xs font-bold leading-snug text-[#59636d] transition-colors duration-200 group-hover:text-[#c24242] sm:mt-4 sm:text-sm">
                <span>{dict.schedulesLabel}</span>
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
