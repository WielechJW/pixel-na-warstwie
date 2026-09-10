export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: readonly string[];
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
  }[];
  takeaways: readonly string[];
};

export const blogArticles = [
  {
    slug: "pierwsze-warstwy-co-nas-zaskoczylo",
    title: "Pierwsze warstwy: co nas zaskoczyło na starcie",
    description:
      "Notatka o tym, dlaczego pierwsza warstwa potrafi zdecydować o całym wydruku i jak zaczynamy podchodzić do testów.",
    publishedAt: "2026-05-30",
    readingTime: "4 min",
    category: "Start",
    tags: ["pierwsza warstwa", "początki", "obserwacje"],
    sections: [
      {
        heading: "Najpierw patrzymy na podstawy",
        paragraphs: [
          "Na początku najłatwiej zachwycić się samym faktem, że model rośnie warstwa po warstwie. Szybko jednak widać, że druk 3D nagradza spokojne sprawdzanie podstaw: poziomowania stołu, czystości powierzchni i temperatury.",
          "Dlatego zamiast gonić za dużymi modelami chcemy zaczynać od małych testów. Krótki wydruk daje szybką odpowiedź, czy zmiana ustawienia faktycznie pomaga.",
        ],
      },
      {
        heading: "Co zapisujemy po wydruku",
        paragraphs: [
          "Przy każdym teście notujemy materiał, temperaturę dyszy i stołu, prędkość oraz to, co widać na pierwszych minutach pracy drukarki. To proste dane, ale bez nich łatwo zapomnieć, która zmiana miała sens.",
          "Najważniejsza lekcja z początku jest prosta: pojedyncza poprawka naraz daje więcej wiedzy niż pięć zmian wprowadzonych jednocześnie.",
        ],
      },
    ],
    takeaways: [
      "Pierwsza warstwa mówi dużo o całym wydruku.",
      "Małe testy są lepsze do nauki niż długie, efektowne modele.",
      "Warto zapisywać ustawienia od pierwszego dnia.",
    ],
  },
  {
    slug: "kalibracja-stolu-bez-magii",
    title: "Kalibracja stołu bez magii i nerwowego kręcenia",
    description:
      "Jak chcemy podchodzić do poziomowania stołu: spokojnie, powtarzalnie i z notatkami zamiast zgadywania.",
    publishedAt: "2026-05-18",
    readingTime: "5 min",
    category: "Kalibracja",
    tags: ["stół", "kalibracja", "pierwsza warstwa"],
    sections: [
      {
        heading: "Powtarzalność ważniejsza niż przeczucie",
        paragraphs: [
          "Poziomowanie stołu brzmi jak prosta czynność, dopóki pierwsza warstwa nie zacznie wyglądać inaczej w każdym narożniku. Chcemy opisywać ten proces bez skrótów myślowych, bo właśnie tu łatwo nabrać złych nawyków.",
          "Największą różnicę robi powtarzalna procedura. Ta sama kolejność sprawdzania, ta sama kartka albo sonda, ta sama cierpliwość przed oceną wyniku.",
        ],
      },
      {
        heading: "Jak oceniamy efekt",
        paragraphs: [
          "Nie wystarczy, że dysza porusza się nad stołem. Patrzymy na to, czy linia filamentu jest dociśnięta, czy nie jest rozmazana i czy nie odkleja się przy zmianie kierunku.",
          "Wpisy z tej serii będą wracały do konkretnych objawów, bo jedno słowo: kalibracja, kryje kilka różnych problemów.",
        ],
      },
    ],
    takeaways: [
      "Stała procedura zmniejsza liczbę zgadywanek.",
      "Pierwsza warstwa powinna być oceniana w kilku miejscach stołu.",
      "Nie każdy problem z przyczepnością oznacza to samo.",
    ],
  },
  {
    slug: "pla-czego-uczymy-sie-na-poczatku",
    title: "PLA na początek: czego uczymy się na najprostszym materiale",
    description:
      "PLA wydaje się łatwe, ale już na nim widać wpływ temperatury, chłodzenia, prędkości i przechowywania filamentu.",
    publishedAt: "2026-05-05",
    readingTime: "4 min",
    category: "Materiały",
    tags: ["PLA", "filament", "temperatura"],
    sections: [
      {
        heading: "Dobry materiał do nauki",
        paragraphs: [
          "PLA jest popularne nie bez powodu: wybacza sporo błędów i pozwala szybko zobaczyć efekt zmian w ustawieniach. To dobry materiał na początek, ale nie oznacza to, że wszystkie problemy znikają same.",
          "Na PLA chcemy uczyć się czytania wydruku: gdzie pojawia się nitkowanie, kiedy narożniki zaczynają się podnosić i jak chłodzenie wpływa na szczegóły.",
        ],
      },
      {
        heading: "Nie zapisujemy tylko sukcesów",
        paragraphs: [
          "Jeżeli test nie wyjdzie, nadal jest przydatny. Daje porównanie i pozwala wrócić do ustawień, które wcześniej wyglądały lepiej.",
          "Właśnie dlatego blog ma być dziennikiem, a nie galerią gotowych przedmiotów. Proces jest tu ważniejszy niż zdjęcie końcowego modelu.",
        ],
      },
    ],
    takeaways: [
      "PLA jest dobrym materiałem do nauki zależności między ustawieniami.",
      "Nieudany test potrafi dać konkretną informację.",
      "Proces i obserwacje są ważniejsze niż efektowna galeria.",
    ],
  },
] as const satisfies readonly BlogArticle[];

type CmsRelationship =
  | {
      name?: unknown;
      slug?: unknown;
    }
  | number
  | string
  | null
  | undefined;

type CmsPost = {
  category?: CmsRelationship;
  description?: unknown;
  publishedAt?: unknown;
  readingTime?: unknown;
  sections?: unknown;
  slug?: unknown;
  tags?: unknown;
  takeaways?: unknown;
  title?: unknown;
};

type CmsPostsResponse = {
  docs?: unknown;
  hasNextPage?: boolean;
};

const cmsArticlesRevalidateSeconds = 60;

export async function getBlogArticles(): Promise<readonly BlogArticle[]> {
  const cmsArticles = await fetchCmsBlogArticles();

  return cmsArticles ?? blogArticles;
}

export async function getBlogArticleSlugs() {
  const articles = await getBlogArticles();

  return articles.map((article) => article.slug);
}

export async function getArticleBySlug(slug: string) {
  const articles = await getBlogArticles();

  return articles.find((article) => article.slug === slug) ?? null;
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

async function fetchCmsBlogArticles(): Promise<BlogArticle[] | null> {
  const cmsUrl = process.env.CMS_URL;

  if (!cmsUrl) {
    return null;
  }

  try {
    const postsUrl = new URL("/api/posts", cmsUrl);
    postsUrl.searchParams.set("depth", "2");
    postsUrl.searchParams.set("limit", "100");
    postsUrl.searchParams.set("sort", "-publishedAt");
    postsUrl.searchParams.set("where[status][equals]", "published");

    const articles: BlogArticle[] = [];
    for (let page = 1; ; page += 1) {
      postsUrl.searchParams.set("page", String(page));
      const response = await fetch(postsUrl, {
        signal: AbortSignal.timeout(5_000),
        next: { revalidate: cmsArticlesRevalidateSeconds },
      });
      if (!response.ok) throw new Error(`CMS returned HTTP ${response.status}`);
      const payload = (await response.json()) as CmsPostsResponse;
      if (!Array.isArray(payload.docs)) throw new Error("Invalid CMS response");
      articles.push(...payload.docs
        .map((post) => mapCmsPostToArticle(post))
        .filter((article): article is BlogArticle => article !== null));
      if (!payload.hasNextPage) return articles;
      if (payload.docs.length === 0) throw new Error("Invalid CMS pagination");
    }
  } catch (error) {
    // Throwing lets ISR retain the last successful page instead of publishing
    // bundled demo content over real posts during a CMS outage.
    throw new Error("Nie udało się pobrać wpisów z CMS-a.", { cause: error });
  }
}

function mapCmsPostToArticle(post: unknown): BlogArticle | null {
  if (!isRecord(post)) {
    return null;
  }

  const cmsPost = post as CmsPost;
  const slug = readString(cmsPost.slug);
  const title = readString(cmsPost.title);
  const description = readString(cmsPost.description);
  const publishedAt = readString(cmsPost.publishedAt);
  const readingTime = readString(cmsPost.readingTime);

  if (!slug || !title || !description || !publishedAt || !readingTime ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !Number.isFinite(Date.parse(publishedAt))) {
    return null;
  }

  return {
    category: readRelationshipName(cmsPost.category) ?? "Blog",
    description,
    publishedAt,
    readingTime,
    sections: readCmsSections(cmsPost.sections),
    slug,
    tags: readCmsTags(cmsPost.tags),
    takeaways: readCmsTakeaways(cmsPost.takeaways),
    title,
  };
}

function readCmsSections(value: unknown): BlogArticle["sections"] {
  if (!Array.isArray(value)) {
    return [];
  }

  const sections: BlogArticle["sections"][number][] = [];

  for (const section of value) {
    if (!isRecord(section)) {
      continue;
    }

    const heading = readString(section.heading);
    const paragraphs = Array.isArray(section.paragraphs)
      ? section.paragraphs
          .map((paragraph) =>
            isRecord(paragraph) ? readString(paragraph.text) : "",
          )
          .filter(Boolean)
      : [];

    if (!heading || paragraphs.length === 0) {
      continue;
    }

    sections.push({
      heading,
      paragraphs,
    });
  }

  return sections;
}

function readCmsTakeaways(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((takeaway) => (isRecord(takeaway) ? readString(takeaway.text) : ""))
    .filter(Boolean);
}

function readCmsTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((tag) => readRelationshipName(tag))
    .filter((tag): tag is string => Boolean(tag));
}

function readRelationshipName(value: CmsRelationship) {
  if (!isRecord(value)) {
    return null;
  }

  return readString(value.name) || readString(value.slug) || null;
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
