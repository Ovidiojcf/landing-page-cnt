import type { Dictionary } from "@/get-dictionary";

interface ContactPageProps {
  dict: Dictionary;
}

export function ContactPage({ dict }: ContactPageProps) {
  const { footer, pages } = dict;

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-sky-800">
            {pages.contact.categoryTitle}
          </p>
          <h1 className="font-metropolis text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {pages.contact.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            {pages.contact.description}
          </p>
        </div>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <dt className="text-sm font-bold text-slate-600">
              {pages.contact.emailLabel}
            </dt>
            <dd className="mt-2">
              <a
                href={`mailto:${footer.email}`}
                className="break-all text-lg font-bold text-[#111e2e] underline decoration-slate-400 underline-offset-4 hover:decoration-[#111e2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111e2e]"
              >
                {footer.email}
              </a>
            </dd>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <dt className="text-sm font-bold text-slate-600">
              {footer.phone_label}
            </dt>
            <dd className="mt-2">
              <a
                href={`tel:${footer.phone_number.replace(/[^\d+]/g, "")}`}
                className="text-lg font-bold text-[#111e2e] underline decoration-slate-400 underline-offset-4 hover:decoration-[#111e2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111e2e]"
              >
                {footer.phone_number}
              </a>
            </dd>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2">
            <dt className="text-sm font-bold text-slate-600">
              {footer.office_title}
            </dt>
            <dd className="mt-2">
              <address className="text-base leading-7 text-slate-800 not-italic">
                {footer.address}
                <br />
                {footer.cep}
              </address>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
