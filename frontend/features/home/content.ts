type TextCard = {
  title: string;
  text: string;
};

type Project = {
  name: string;
  category: string;
  image: string;
  featured?: boolean;
};

export const heroHighlights = [
  "Druk na zamówienie",
  "Kreatywne projekty",
  "Z pasji",
] as const;

export const services: readonly TextCard[] = [
  {
    title: "Dekoracje i figurki",
    text: "Ozdoby, figurki i dodatki, które nadają przestrzeni własny charakter.",
  },
  {
    title: "Gadżety i prezenty",
    text: "Breloki, drobiazgi i personalizowane pomysły na nietypowy upominek.",
  },
  {
    title: "Praktyczne akcesoria",
    text: "Organizery, uchwyty i stojaki tworzone z myślą o codziennym użyciu.",
  },
  {
    title: "Wydruk z pomysłu",
    text: "Masz inspirację albo gotowy model? Sprawdzimy, jak zamienić go w wydruk.",
  },
];

export const reasons: readonly TextCard[] = [
  {
    title: "Pasja do tworzenia",
    text: "Nie drukujemy anonimowo. Każdy projekt przechodzi przez nasze ręce i oko do detalu.",
  },
  {
    title: "Pomoc w wyborze",
    text: "Podpowiemy rozmiar, kolor i rozwiązanie, które najlepiej pasuje do pomysłu.",
  },
  {
    title: "Braterska pracownia",
    text: "Kontaktujesz się bezpośrednio z ludźmi, którzy przygotują Twój projekt.",
  },
];

export const steps: readonly TextCard[] = [
  {
    title: "Opowiadasz o pomyśle",
    text: "Wysyłasz inspirację, zdjęcie, opis albo gotowy model 3D.",
  },
  {
    title: "Ustalamy szczegóły",
    text: "Dobieramy wielkość, kolor, materiał i możliwości wykonania.",
  },
  {
    title: "Drukujemy",
    text: "Twój przedmiot powstaje cierpliwie, warstwa po warstwie.",
  },
  {
    title: "Gotowy efekt",
    text: "Po sprawdzeniu wydruku ustalamy jego odbiór lub wysyłkę.",
  },
];

export const projects: readonly Project[] = [
  {
    name: "Ruchomy szkielet",
    category: "Figurka kolekcjonerska",
    image: "/project/skeleton-git.png",
    featured: true,
  },
  {
    name: "Dinozaur",
    category: "Model przegubowy",
    image: "/project/dino-git.png",
  },
  {
    name: "Skrzydlaty model",
    category: "Model przegubowy",
    image: "/project/bird-git.png",
  },
  {
    name: "Front BMW",
    category: "Dekoracja motoryzacyjna",
    image: "/project/bmw-git.png",
  },
  {
    name: "Front Opel",
    category: "Dekoracja motoryzacyjna",
    image: "/project/opel-git.png",
  },
];
