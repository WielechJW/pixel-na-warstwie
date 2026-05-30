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

export function getArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug) ?? null;
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
