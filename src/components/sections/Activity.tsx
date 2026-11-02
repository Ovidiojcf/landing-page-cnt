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

export function Activity({ dict }: ActivitiesProps) {
  return (
    <section className="bg-[#23314D] text-white px-4 py-8 w-full mr-auto ml-auto flex-col flex">
      <h2 className="text-center font-metropolis text-3xl sm:text-4xl">
        {dict.title}
      </h2>
      <p className="text-center mt-2 mb-1 text-base sm:text-lg">{dict.subtitle}</p>
      <div className="min-h-auto min-w-10 max-w-300 ml-auto mr-auto">
        <div className="flex m-0 w-full">
          <article className="w-66.25 h-60 ml-[calc(-92px)]">
            <Image
              src="/ferry.webp"
              alt={dict.activities.ferry}
              width={266}
              height={260}
              className="h-60 mask-clip-content mask-[url(/section-mask.svg)]"
            />
            <p className="text-center text-base w-35 content-center m-auto">
              {dict.activities.ferry}
            </p>
          </article>
          <article className="ml-[calc(-92px)]">
            <Image
              src="/cargo.webp"
              alt={dict.activities.cargo}
              width={266}
              height={260}
              className="h-60 mask-clip-content mask-[url(/section-mask.svg)] ml-1"
            />
            <p className="text-center text-base w-20 m-auto">
              {dict.activities.cargo}
            </p>
          </article>
          <article className="ml-[calc(-92px)]">
            <Image
              src={"/rental.webp"}
              alt={dict.activities.rental}
              width={266}
              height={260}
              className="h-60 mask-clip-content mask-[url(/section-mask.svg)] ml-1"
            />
            <p className="text-center text-base w-35 m-auto">
              {dict.activities.rental}
            </p>
          </article>
          <article className="ml-[calc(-92px)]">
            <Image
              src={"/port_admin.webp"}
              alt={dict.activities.port_admin}
              width={266}
              height={260}
              className="h-60 mask-clip-content mask-[url(/section-mask.svg)] ml-1"
            />
            <p className="text-center text-base w-35 m-auto">
              {dict.activities.port_admin}
            </p>
          </article>
          <article className="ml-[calc(-92px)]">
            <Image
              src={"/construction.webp"}
              alt={dict.activities.construction}
              width={266}
              height={260}
              className="h-60 mask-clip-content mask-[url(/section-mask.svg)] ml-1"
            />
            <p className="text-center text-base w-35 m-auto">
              {dict.activities.construction}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
