import { weekdays, type Weekday } from "@/data/journeys/types";

export function getRouteTitle<T extends object>(
  routes: T,
  slug: string,
): string | undefined {
  if (!Object.prototype.hasOwnProperty.call(routes, slug)) {
    return undefined;
  }

  const title = routes[slug as keyof T];
  return typeof title === "string" ? title : undefined;
}

interface WeekdayLabels {
  full: Record<Weekday, string>;
  range: Record<Weekday, string>;
  rangeSeparator: string;
}

export function formatJourneyDays(
  days: readonly Weekday[],
  labels: WeekdayLabels,
): string {
  const orderedDays = weekdays.filter((day) => days.includes(day));
  if (orderedDays.length === 0) return "";
  if (orderedDays.length === 1) return labels.full[orderedDays[0]];

  const ranges: Weekday[][] = [];
  for (const day of orderedDays) {
    const currentRange = ranges[ranges.length - 1];
    const previousDay = currentRange?.[currentRange.length - 1];
    const previousIndex = previousDay ? weekdays.indexOf(previousDay) : -1;
    const currentIndex = weekdays.indexOf(day);

    if (currentRange && previousIndex === currentIndex - 1) {
      currentRange.push(day);
    } else {
      ranges.push([day]);
    }
  }

  return ranges
    .map((range) => {
      const firstDay = range[0];
      const lastDay = range[range.length - 1];
      if (firstDay === lastDay) return labels.full[firstDay];
      const startLabel = labels.range[firstDay];
      const capitalizedStart =
        startLabel.charAt(0).toUpperCase() + startLabel.slice(1);
      return `${capitalizedStart} ${labels.rangeSeparator} ${labels.range[lastDay]}`;
    })
    .join(", ");
}
