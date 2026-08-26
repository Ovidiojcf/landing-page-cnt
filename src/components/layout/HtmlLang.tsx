"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n";

interface HtmlLangProps {
  lang: Locale;
}

export function HtmlLang({ lang }: HtmlLangProps) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
