"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type Locale } from "@/get-dictionary";

interface HeaderNav {
  home: string;
  journeys: string;
  social_projects: string;
  contact: string;
}

export interface HeaderDictionary {
  logo_url: string;
  logo_alt: string;
  title: string;
  button: string;
  nav: HeaderNav;
}

export interface HeaderProps {
  lang: Locale;
  dict: HeaderDictionary;
}

const localeOptions: { value: Locale; flag: string; label: string }[] = [
  { value: "pt-br", flag: "🇧🇷", label: "PT" },
  { value: "en-us", flag: "🇺🇸", label: "EN" },
];

function normalizeLogoUrl(url: string): string {
  const cleaned = url.replace(/^public\//, "");
  return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
}

function buildLocalizedPath(pathname: string, locale: Locale): string {
  const pathWithoutLocale = pathname.replace(/^\/(pt-br|en-us)(?=\/|$)/, "");
  return `/${locale}${pathWithoutLocale}`;
}

interface LanguageSwitcherProps {
  lang: Locale;
  variant?: "compact" | "full";
}

function LanguageSwitcher({ lang, variant = "full" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLocaleChange(nextLocale: Locale) {
    if (nextLocale === lang) return;
    router.push(buildLocalizedPath(pathname, nextLocale));
  }

  if (variant === "compact") {
    const inactiveLocale = localeOptions.find((option) => option.value !== lang);

    return (
      <button
        type="button"
        onClick={() => inactiveLocale && handleLocaleChange(inactiveLocale.value)}
        className="flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
        aria-label={`Switch language to ${inactiveLocale?.label ?? ""}`}
      >
        <span aria-hidden="true">{inactiveLocale?.flag}</span>
        <span>{inactiveLocale?.label}</span>
      </button>
    );
  }

  return (
    <div
      className="flex items-center rounded-full border border-white/20 p-1"
      role="group"
      aria-label="Language selector"
    >
      {localeOptions.map((option) => {
        const isActive = option.value === lang;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleLocaleChange(option.value)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span aria-hidden="true">{option.flag}</span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  lang: Locale;
  dict: HeaderDictionary;
  onClose: () => void;
}

function MobileMenu({ isOpen, lang, dict, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <nav
      id="mobile-navigation"
      className="border-t border-white/10 bg-[#111e2e]/95 px-4 py-4 md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex flex-col gap-1">
        {/* Home */}
        <li>
          <Link
            href={`/${lang}`}
            onClick={onClose}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            {dict.nav.home}
          </Link>
        </li>

        <li>
          <div className="px-3 py-2 text-sm font-medium text-white/50">{dict.nav.journeys}</div>
          <Link
            href={`/${lang}/travessias/belem-macapa`}
            onClick={onClose}
            className="block rounded-lg pl-6 pr-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Belém x Macapá
          </Link>
          <Link
            href={`/${lang}/travessias/belem-manaus`}
            onClick={onClose}
            className="block rounded-lg pl-6 pr-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Belém x Manaus
          </Link>
        </li>

        {/* Projetos Sociais */}
        <li>
           <div className="px-3 py-2 text-sm font-medium text-white/50">{dict.nav.social_projects}</div>
          <Link
            href={`/${lang}/projetos-sociais/ribeirinhos`}
            onClick={onClose}
            className="block rounded-lg pl-6 pr-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Apoio aos Ribeirinhos
          </Link>
        </li>

        {/* Contato */}
        <li>
          <Link
            href={`/${lang}/contato`}
            onClick={onClose}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            {dict.nav.contact}
          </Link>
        </li>
      </ul>

      <div className="mt-4 border-t border-white/10 pt-4">
        <Link
          href="#contact"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#111e2e] transition-colors hover:bg-white/90"
        >
          {dict.button}
        </Link>
      </div>
    </nav>
  );
}

export function Header({ lang, dict }: HeaderProps) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoSrc = normalizeLogoUrl(dict.logo_url);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((previous) => !previous);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-[#111e2e]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-3"
          aria-label={dict.title}
        >
          <Image
            src={logoSrc}
            alt={dict.logo_alt}
            width={160}
            height={40} 
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>


        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          

          <Link href={`/${lang}`} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
            {dict.nav.home}
          </Link>

          <div className="relative group py-2">
            <button className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white">
              {dict.nav.journeys}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 hidden w-56 rounded-lg bg-[#1e293b] p-2 shadow-xl border border-white/10 group-hover:block">
              <Link href={`/${lang}/travessias/belem-macapa`} className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                Belém x Macapá
              </Link>
              <Link href={`/${lang}/travessias/belem-manaus`} className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                Belém x Manaus
              </Link>
            </div>
          </div>

          <div className="relative group py-2">
            <button className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white">
              {dict.nav.social_projects}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 hidden w-56 rounded-lg bg-[#1e293b] p-2 shadow-xl border border-white/10 group-hover:block">
              <Link href={`/${lang}/projetos-sociais/ribeirinhos`} className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                Apoio aos Ribeirinhos
              </Link>
            </div>
          </div>

          <Link href={`/${lang}/contato`} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
            {dict.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="md:hidden">
            <LanguageSwitcher lang={lang} variant="compact" />
          </div>

          <div className="hidden md:block">
            <LanguageSwitcher lang={lang} variant="full" />
          </div>

          <Link
            href="#contact"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#111e2e] transition-colors hover:bg-white/90 md:inline-flex"
          >
            {dict.button}
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        lang={lang}
        dict={dict}
        onClose={closeMobileMenu}
      />
    </header>
  );
}
