import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/pages/ContactPage";
import { getDictionary, isValidLocale } from "@/get-dictionary";

interface ContactRouteProps {
  params: Promise<{ lang: string }>;
}

async function getContactPageData(params: ContactRouteProps["params"]) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return { dict };
}

export async function generateMetadata({
  params,
}: ContactRouteProps): Promise<Metadata> {
  const { dict } = await getContactPageData(params);
  return {
    title: `${dict.pages.contact.title} | ${dict.header.title}`,
    description: dict.pages.contact.description,
  };
}

export default async function ContactRoute({ params }: ContactRouteProps) {
  const { dict } = await getContactPageData(params);
  return <ContactPage dict={dict} />;
}
