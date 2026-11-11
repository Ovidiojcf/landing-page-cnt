import type { Locale } from "@/get-dictionary";

export const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type Weekday = (typeof weekdays)[number];

export interface JourneyData {
  slug: string;
  content: Record<Locale, { title: string; description: string }>;
  directions: {
    origin: string;
    destination: string;
    schedule: { days: Weekday[]; times: string[] }[];
  }[];
  contacts: string[];
}
