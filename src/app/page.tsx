import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPreferredLocaleFromHeader } from "@/i18n";

export default async function RootPage() {
  const headerList = await headers();
  const locale = getPreferredLocaleFromHeader(headerList.get("accept-language"));
  redirect(`/${locale}`);
}
