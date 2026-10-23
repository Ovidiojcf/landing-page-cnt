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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {dict.items.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-md border border-slate-900/10 bg-white"
            >
              <div className="relative aspect-16/5 w-full">
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
                <p className="mt-2 font-nexa text-base font-light leading-relaxed text-slate-700">
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
