import Image from "next/image";
import { type Locale } from "@/get-dictionary";

interface SectionActivities {
  ferry: string;
  cargo: string;
  rental: string;
  port_admin: string;
  construction: string;
}

export interface SectionDictionary {
  title: string;
  subtitle: string;
  activities: SectionActivities;
}

export interface SectionProps {
  lang: Locale;
  dict: SectionDictionary;
}

//bg-[url(https://static.wixstatic.com/media/886e87_8838a252f4084e828257a5a9d09f6edb~mv2.jpg/v1/fill/w_768,h_287,al_c,lg_1,q_80,enc_avif,quality_auto/886e87_8838a252f4084e828257a5a9d09f6edb~mv2.jpg)]
// -skew-12 grid-auto-flow: column gap-1
// skew-x-12 -left-40 object-fill
export function SectionActivity({ lang, dict }: SectionProps) {
  return (
    <section className="bg-[#23314D] text-white py-8 w-full mr-auto ml-auto flex-col flex">
      <h2 className="text-center font-bold text-[2.5rem] bg-[]">{dict.title}</h2>
      <div className="place-content-center w-58 bg-[#BD423F]">
        <span className="h-2"></span>
        <span className="h-1"></span>
      </div>
      <p className="text-center text-[1rem]">{dict.subtitle}</p>
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
            <p className="text-center text-sm w-35 content-center m-auto">
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
            <p className="text-center text-sm w-35 m-auto">
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
            <p className="text-center text-sm w-35 m-auto">
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
            <p className="text-center text-sm w-35 m-auto">
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
            <p className="text-center text-sm w-35 m-auto">
              {dict.activities.construction}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
