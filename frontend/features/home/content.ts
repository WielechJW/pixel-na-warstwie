type TextCard = {
  title: string;
  text: string;
};

export const heroHighlights = [
  "Pierwsze kroki",
  "Błędy i poprawki",
  "Notatki z warsztatu",
] as const;

export const learningTopics: readonly TextCard[] = [
  {
    title: "Start z drukarką",
    text: "Pierwsze ustawienia, przygotowanie miejsca pracy i rzeczy, które warto sprawdzić przed pierwszym wydrukiem.",
  },
  {
    title: "Kalibracja i slicer",
    text: "Notatki z poziomowania, temperatur, podpór, prędkości i profili, które testujemy krok po kroku.",
  },
  {
    title: "Materiały",
    text: "PLA, PETG i inne filamenty opisywane prostym językiem: co działa, co nie działa i co nas zaskakuje.",
  },
  {
    title: "Błędy wydruków",
    text: "Krzywe warstwy, nitkowanie, odklejanie i inne lekcje, które lepiej zapisać niż udawać, że ich nie było.",
  },
];

export const writingPrinciples: readonly TextCard[] = [
  {
    title: "Piszemy z praktyki",
    text: "Każdy wpis ma wychodzić z realnego testu, ustawienia albo problemu, który sami próbujemy zrozumieć.",
  },
  {
    title: "Pokazujemy błędy",
    text: "Nie budujemy katalogu idealnych efektów. Opisujemy też nietrafione próby, bo one uczą najwięcej.",
  },
  {
    title: "Tłumaczymy po ludzku",
    text: "Chcemy, żeby początkujący mógł wejść w temat bez słownika specjalistycznych skrótów pod ręką.",
  },
];

export const learningSteps: readonly TextCard[] = [
  {
    title: "Wybieramy pytanie",
    text: "Zaczynamy od konkretu: dlaczego warstwa się odkleiła, czemu pojawiły się nitki albo co zmieni temperatura.",
  },
  {
    title: "Robimy test",
    text: "Zmieniamy jedną rzecz naraz, zapisujemy ustawienia i patrzymy, czy wydruk zachowuje się lepiej.",
  },
  {
    title: "Spisujemy wnioski",
    text: "Zbieramy obserwacje w prostą notatkę: co pomogło, co było bez znaczenia i czego jeszcze nie wiemy.",
  },
  {
    title: "Wracamy do tematu",
    text: "Jeśli późniejszy test zmieni nasze zdanie, aktualizujemy podejście zamiast udawać, że pierwsza wersja była ostateczna.",
  },
];
