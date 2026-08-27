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
    <section className="bg-[#23314D] text-white py-8">
      <h2 className="text-center font-bold text-[2.5rem]">{dict.title}</h2>
      <div className="place-content-center w-58 bg-[#BD423F]">
        <span className="h-2"></span>
        <span className="h-1"></span>
      </div>
      <p className="text-center text-[1rem]">{dict.subtitle}</p>
      <div className="grid grid-flow-col grid-cols-5 overflow-x-scroll mx-auto max-w-243 -skew-x-12">
        <article>
          <div className="w-[184px] h-[260px] backface-hidden overflow-hidden ">
            <Image
              src="/ferry.webp"
              alt={dict.activities.ferry}
              width={200}
              height={300}
              className=""
            />
          </div>
          <p className="text-center text-sm skew-x-12 w-46">
            {dict.activities.construction}
          </p>
        </article>
        <article>
          <Image
            src="/cargo.webp"
            alt={dict.activities.cargo}
            width={184}
            height={260}
          />
          <p className="text-center text-sm skew-x-12 w-46">
            {dict.activities.cargo}
          </p>
        </article>
        <article>
          <Image
            src={"/rental.webp"}
            alt={dict.activities.rental}
            width={184}
            height={260}
          />
          <p className="text-center text-sm skew-x-12 w-46">
            {dict.activities.rental}
          </p>
        </article>
        <article>
          <Image
            src={"/port_admin.webp"}
            alt={dict.activities.port_admin}
            width={184}
            height={260}
          />
          <p className="text-center text-sm skew-x-12 w-46">
            {dict.activities.port_admin}
          </p>
        </article>
        <article>
          <Image
            src={"/construction.webp"}
            alt={dict.activities.construction}
            width={184}
            height={260}
          />
          <p className="text-center text-sm skew-x-12 w-46">
            {dict.activities.construction}
          </p>
        </article>
      </div>
    </section>
  );
}
