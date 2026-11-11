import type { Dictionary } from "@/get-dictionary";
import type { JourneyData } from "@/data/journeys/types";
import { formatJourneyDays } from "@/lib/page-content";

interface JourneyDetailPageProps {
  categoryTitle: string;
  title: string;
  description: string;
  labels: Dictionary["pages"]["journeys"]["detail"];
  journey: JourneyData;
}

export function JourneyDetailPage({
  categoryTitle,
  title,
  description,
  labels,
  journey,
}: JourneyDetailPageProps) {
  return (
    <main>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-sky-800">
            {categoryTitle}
          </p>
          <h1 className="font-metropolis text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            {description}
          </p>
        </header>

        <section className="mt-12" aria-labelledby="journey-schedules-title">
          <h2
            id="journey-schedules-title"
            className="font-metropolis text-2xl font-bold text-slate-950 sm:text-3xl"
          >
            {labels.scheduleTitle}
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {journey.directions.map((direction) => (
              <section
                key={`${direction.origin}-${direction.destination}`}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                aria-labelledby={`departures-${direction.origin}-${direction.destination}`}
              >
                <h3
                  id={`departures-${direction.origin}-${direction.destination}`}
                  className="font-metropolis text-lg font-bold text-slate-900 sm:text-xl"
                >
                  {labels.departuresFrom} {direction.origin} {labels.to}{" "}
                  {direction.destination}
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[18rem] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-600">
                        <th scope="col" className="py-3 pr-4 font-bold">
                          {labels.dayColumn}
                        </th>
                        <th scope="col" className="py-3 font-bold">
                          {labels.timesColumn}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {direction.schedule.map((departure) => (
                        <tr
                          key={departure.days.join("-")}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <th
                            scope="row"
                            className="py-3 pr-4 align-top font-bold text-slate-800"
                          >
                            {formatJourneyDays(departure.days, labels.days)}
                          </th>
                          <td className="py-3 text-slate-700">
                            {departure.times.map((time, index) => (
                              <span key={time}>
                                {index > 0 ? ", " : ""}
                                <time dateTime={time}>{time}</time>
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="journey-contacts-title">
          <h2
            id="journey-contacts-title"
            className="font-metropolis text-2xl font-bold text-slate-950 sm:text-3xl"
          >
            {labels.localContactsTitle}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {journey.contacts.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#c24242]/30 bg-white px-5 py-2 font-bold text-[#c24242] underline decoration-transparent underline-offset-4 transition-colors hover:bg-[#c24242]/5 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c24242]"
                >
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* TODO(tarifas): adicionar futuramente a consulta e a tabela de tarifas desta travessia. */}
      </section>
    </main>
  );
}
