import Image from "next/image";

interface FleetItem {
  name: string;
  description: string;
  quantity: string;
}

interface FleetDictionary {
  title: string;
  description: string;
  items: FleetItem[];
}

interface FleetProps {
  dict: FleetDictionary;
}

export function Fleet({ dict }: FleetProps) {
  return (
    <section
      aria-labelledby="fleet-title"
      className="bg-stone-50 px-4 py-9 text-slate-900 sm:px-6 sm:py-10 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 text-center sm:mb-8">
          <h2 id="fleet-title" className="font-metropolis text-3xl sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-base leading-relaxed text-slate-600 sm:mt-3">
            {dict.description}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {dict.items.map((item) => (
            <article
              key={item.name}
              className="min-w-0"
            >
              <div className="relative aspect-video max-h-70 w-full  overflow-hidden">
                <Image
                  src="/FB_VALENTINA_02.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-5">
                <p className="mb-2 inline-flex rounded-sm border border-blue-950/15 bg-blue-950/5 px-2 py-1 font-metropolis text-xs text-blue-950">
                  {item.quantity}
                </p>
                <h3 className="font-metropolis text-xl text-blue-950 sm:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-2 max-w-prose font-nexa text-sm text-justify leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
