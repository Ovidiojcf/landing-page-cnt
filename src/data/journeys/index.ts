import aninduba from "./santarem-aninduba.json";
import santanaDoTapara from "./santarem-santana-do-tapara.json";
import cametaCarapajo from "./cameta-carapajo.json";
import baiaoVarginhaTranscameta from "./baiao-varginha-transcameta.json";
import type { JourneyData, Weekday } from "./types";
import { weekdays } from "./types";

const journeyFiles: Record<string, unknown> = {
  "santarem-aninduba": aninduba,
  "santarem-santana-do-tapara": santanaDoTapara,
  "cameta-carapajo": cametaCarapajo,
  "baiao-varginha-transcameta": baiaoVarginhaTranscameta,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocalizedContent(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const portuguese = value["pt-br"];
  const english = value["en-us"];

  return (
    isRecord(portuguese) &&
    typeof portuguese.title === "string" &&
    typeof portuguese.description === "string" &&
    isRecord(english) &&
    typeof english.title === "string" &&
    typeof english.description === "string"
  );
}

function isWeekday(value: unknown): value is Weekday {
  return weekdays.some((weekday) => weekday === value);
}

function isJourneyData(value: unknown): value is JourneyData {
  return (
    isRecord(value) &&
    typeof value.slug === "string" &&
    isLocalizedContent(value.content) &&
    Array.isArray(value.directions) &&
    value.directions.length > 0 &&
    value.directions.every(
      (direction) =>
        isRecord(direction) &&
        typeof direction.origin === "string" &&
        typeof direction.destination === "string" &&
        Array.isArray(direction.schedule) &&
        direction.schedule.length > 0 &&
        direction.schedule.every(
          (group) =>
            isRecord(group) &&
            Array.isArray(group.days) &&
            group.days.length > 0 &&
            group.days.every(isWeekday) &&
            Array.isArray(group.times) &&
            group.times.length > 0 &&
            group.times.every(
              (time) =>
                typeof time === "string" &&
                /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time),
            ),
        ),
    ) &&
    Array.isArray(value.contacts) &&
    value.contacts.every((contact) => typeof contact === "string")
  );
}

export function getJourneyData(slug: string): JourneyData | undefined {
  const data = journeyFiles[slug];
  if (data === undefined) return undefined;

  if (!isJourneyData(data)) {
    throw new Error(`Invalid journey data for slug "${slug}".`);
  }
  if (data.slug !== slug) {
    throw new Error(
      `Journey data slug mismatch: requested "${slug}", found "${data.slug}".`,
    );
  }

  return data;
}
