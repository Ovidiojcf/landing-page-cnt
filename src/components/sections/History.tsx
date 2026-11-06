import Image from "next/image";

interface HistoryDictionary {
  title: string;
  description: string;
}

interface HistoryProps {
  dict: HistoryDictionary;
}

export function History({ dict }: HistoryProps) {
  return (
    <section
      aria-labelledby="history-title"
      className="bg-stone-50 px-5 py-14 text-slate-900 sm:px-6 md:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <h2
            id="history-title"
            className="font-metropolis text-3xl leading-tight tracking-tight text-blue-950 sm:text-4xl"
          >
            {dict.title}
          </h2>
          <div
            aria-hidden="true"
            className="mt-3 h-0.5 w-12 bg-[#c24242] sm:mt-4"
          />
          <p className="mt-4 max-w-3xl font-nexa text-base text-justify leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
            {dict.description}
          </p>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <Image
            src="/animated-ferry-boat-camila-navegacao.svg"
            alt=""
            aria-hidden="true"
            width={531}
            height={276}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
