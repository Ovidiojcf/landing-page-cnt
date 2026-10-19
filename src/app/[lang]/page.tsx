import { Hero } from "@/components/sections/Hero";
import { Awards } from "@/components/sections/Awards";
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
      <Awards dict={dictionary.awards}/>
    </main>
  );
}
