import Image from "next/image";

interface Activities {
  ferry: string;
  cargo: string;
  rental: string;
  port_admin: string;
  construction: string;
}

export interface ActivityDictionary {
  title: string;
  subtitle: string;
  activities: Activities;
}

export interface ActivitiesProps {
  dict: ActivityDictionary;
}

const activityCards = [
  {
    key: "ferry",
    image: "/photos/balsa-lady-neuzinha.webp",
    column: "col-start-1",
    objectPosition: "50% 70%",
  },
  {
    key: "cargo",
    image: "/photos/empurrador-castelo-forte-camila-navegacao.jpeg",
    column: "col-start-3",
    objectPosition: "50% 35%",
  },
  {
    key: "rental",
    image: "/FB_VALENTINA_02.png",
    column: "col-start-5",
    objectPosition: "50% 35%",
  },
  {
    key: "port_admin",
    image: "/photos/administracao-portuaria.jpg",
    column: "col-start-7",
    objectPosition: "50% 50%",
  },
  {
    key: "construction",
    image: "/photos/soldador-naval.jpg",
    column: "col-start-9",
    objectPosition: "50% 35%",
  },
] as const;

export function Activity({ dict }: ActivitiesProps) {
  return (
    <section
      aria-labelledby="activity-title"
      className="relative isolate flex w-full flex-col overflow-hidden px-4 py-6 text-white sm:py-8"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/ferry.webp')" }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-blue-950/85 bg-blend-multiply"
      />

      {/* Heading */}
      <h2
        id="activity-title"
        className="text-center font-metropolis text-2xl sm:text-3xl lg:text-4xl"
      >
        {dict.title}
      </h2>

      <p className="mt-2 mb-3 text-center text-xs sm:text-sm lg:text-base">
        {dict.subtitle}
      </p>

      <div className="mx-auto w-full max-w-5xl lg:max-w-6xl">
        {/* Images */}
        <div className="grid w-full grid-cols-12 items-start">
          {activityCards.map(({ key, image, column, objectPosition }) => (
            <article
              key={key}
              className={`col-span-4 row-start-1 min-w-0 ${column}`}
            >
              <Image
                src={image}
                alt=""
                width={266}
                height={240}
                quality={90}
                sizes="(min-width: 74rem) 384px, calc((100vw - 2rem) / 3)"
                style={{ objectPosition }}
                className="block aspect-266/240 w-full object-cover mask-clip-content mask-[url(/section-mask.svg)] mask-no-repeat mask-size-[100%_100%]"
              />
            </article>
          ))}
        </div>

        {/* Captions */}
        <div className="mt-3 grid w-full grid-cols-12 items-start">
          {activityCards.map(({ key, column }) => (
            <p
              key={key}
              className={`col-span-4 row-start-1 mx-auto w-1/2 px-0 text-center text-[10px] leading-tight font-semibold wrap-break-word sm:text-xs lg:w-[43%] lg:text-sm ${column}`}
            >
              {dict.activities[key]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}