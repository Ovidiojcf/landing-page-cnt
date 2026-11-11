import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface SocialProjectArticlePageProps {
  title: string;
  hookTitle?: string;
  content: string;
  image?: string;
  imageAlt?: string;
}

export function SocialProjectArticlePage({
  title,
  hookTitle,
  content,
  image,
  imageAlt,
}: SocialProjectArticlePageProps) {
  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center font-metropolis text-2xl font-bold leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
            {hookTitle ?? title}
          </h1>

          {image && imageAlt && (
            <figure className="mt-6 sm:mt-8">
              <div className="relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 3rem), 768px"
                  preload
                  className="object-cover object-[35%_50%]"
                />
              </div>
            </figure>
          )}

          <article className="mx-auto mt-8 max-w-3xl text-base leading-7 text-slate-700 sm:mt-10 sm:text-lg sm:leading-8">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="mb-4 mt-0 font-metropolis text-xl font-bold leading-tight text-slate-950 sm:mb-5 sm:text-2xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-4 mt-8 font-metropolis text-lg font-bold leading-snug text-[#111e2e] sm:mb-5 sm:mt-10 sm:text-xl">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="mb-3 mt-6 font-metropolis text-base font-bold leading-snug text-slate-900 sm:mt-8 sm:text-lg">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="mb-5 indent-8 text-pretty text-justify leading-7 last:mb-0 sm:mb-6 sm:leading-8">
                    {children}
                  </p>
                ),
                a: ({ href, children }) =>
                  href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#111e2e] underline decoration-[#c24242] underline-offset-4 transition-colors hover:text-[#c24242] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111e2e]"
                    >
                      {children}
                    </a>
                  ) : (
                    <span>{children}</span>
                  ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </section>
    </main>
  );
}
