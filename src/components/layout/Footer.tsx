import Image from "next/image";
import { type Dictionary, type Locale } from "@/get-dictionary";

export type FooterDictionary = Dictionary["footer"];

export interface FooterProps {
  lang: Locale;
  dict: FooterDictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer lang={lang} className="bg-gray-800 text-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-8 gap-y-1 px-4 py-8 sm:px-6 xl:grid-cols-[1.2fr_1fr_1fr] xl:gap-x-12 xl:gap-y-6 xl:px-8">
        <div className="flex flex-col items-center justify-center text-center xl:col-span-1">
          <Image
            src={dict.logo_url}
            alt={dict.logo_alt}
            width={172}
            height={139}
            className="h-9 w-auto md:h-10 lg:h-26"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-1 text-center xl:items-start xl:text-left">
          <p className="text-base font-semibold leading-6">
            {dict.company_name}
          </p>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            {dict.office_title}
          </h2>
          <address className="mx-auto max-w-sm wrap-break-word text-sm leading-6 text-white/80 not-italic xl:mx-0 xl:text-left">
            {dict.address}
            <br />
            {dict.cep}
          </address>
        </div>

        <div className="flex flex-col items-center text-center text-sm leading-6 xl:items-start xl:text-left">
          <a
            href={`mailto:${dict.email}`}
            className="inline-flex min-h-8 items-center wrap-break-word text-white/80 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {dict.email}
          </a>
          <p className="flex min-h-8 flex-wrap items-center justify-center gap-x-1.5 text-white/80 xl:justify-start">
            <span>{dict.phone_label}:</span>
            <a
              href={`tel:${dict.phone_number.replace(/[^\d+]/g, "")}`}
              className="inline-flex min-h-8 items-center text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {dict.phone_number}
            </a>
          </p>
        </div>
        <p className="text-center text-sm text-white/80 xl:col-span-3">
          {dict.copyright}
        </p>
      </div>
    </footer>
  );
}
