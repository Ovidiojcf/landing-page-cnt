import { Hero } from "@/components/sections/Hero";
import { Awards } from "@/components/sections/Awards";
import { Fleet } from "@/components/sections/Fleet";
import { Journeys } from "@/components/sections/Journeys";
import { getDictionary } from "@/get-dictionary";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <Hero dict={dictionary.hero} />
      <Journeys dict={dictionary.journeys} />
      <Awards dict={dictionary.awards}/>
      <Fleet dict={dictionary.fleet} />
    </main>
  );
}
