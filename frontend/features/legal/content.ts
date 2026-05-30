export type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

export const legalInfo = {
  ownerName: "Jakub Wielechowski",
  contactEmail: "pixelnawarstwie@gmail.com",
  websiteName: "Pixel na Warstwie",
  hostingProvider: "MyDevil.net",
  lastUpdated: "30 maja 2026",
} as const;

export const privacyPolicySections: readonly LegalSection[] = [
  {
    title: "Administrator danych",
    paragraphs: [
      `Administratorem danych osobowych przetwarzanych w związku z prowadzeniem strony ${legalInfo.websiteName} jest ${legalInfo.ownerName}. Kontakt z administratorem jest możliwy pod adresem e-mail: ${legalInfo.contactEmail}.`,
      "Strona ma obecnie charakter hobbystycznego bloga o nauce druku 3D. Administrator nie prowadzi działalności gospodarczej pod tą marką i nie publikuje na stronie sklepu ani usługi składania zamówień.",
    ],
  },
  {
    title: "Jakie dane mogą być przetwarzane",
    items: [
      "dane techniczne związane z korzystaniem ze strony, takie jak adres IP, dane przeglądarki, data i godzina wizyty oraz informacje zapisywane w logach serwera",
      "dane podane dobrowolnie w wiadomości e-mail lub formularzu kontaktowym, takie jak imię, adres e-mail i treść wiadomości",
      "dane analityczne po wdrożeniu Google Analytics lub Google Tag Manager, ale wyłącznie w zakresie zależnym od wyrażonej zgody na cookies/analitykę",
    ],
  },
  {
    title: "Cele i podstawy przetwarzania",
    items: [
      "prowadzenie strony i zapewnienie jej bezpieczeństwa, na podstawie prawnie uzasadnionego interesu administratora",
      "obsługa kontaktu mailowego lub formularza, na podstawie prawnie uzasadnionego interesu polegającego na odpowiedzi na wiadomość",
      "pomiar statystyk i rozwój strony po wdrożeniu narzędzi analitycznych, na podstawie zgody użytkownika",
      "oznaczanie i obsługa ewentualnych współprac komercyjnych, jeżeli takie pojawią się w przyszłości",
    ],
  },
  {
    title: "Odbiorcy danych",
    paragraphs: [
      `Strona będzie hostowana u dostawcy ${legalInfo.hostingProvider}, który może przetwarzać dane techniczne w ramach świadczenia hostingu i utrzymania serwera.`,
      "Po wdrożeniu narzędzi Google odbiorcą części danych może być Google Ireland Limited oraz podmioty z grupy Google, zgodnie z zasadami usług Google. Takie narzędzia powinny być uruchamiane dopiero po uzyskaniu odpowiedniej zgody użytkownika.",
    ],
  },
  {
    title: "Okres przechowywania",
    items: [
      "wiadomości z kontaktu są przechowywane przez czas potrzebny do obsługi korespondencji i ewentualnego zabezpieczenia roszczeń",
      "logi serwera są przechowywane przez okres wynikający z konfiguracji hostingu i potrzeb bezpieczeństwa",
      "zgody cookies są przechowywane do czasu ich zmiany, wycofania albo usunięcia danych przeglądarki",
    ],
  },
  {
    title: "Prawa użytkownika",
    paragraphs: [
      "Użytkownik ma prawo dostępu do swoich danych, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu wobec przetwarzania oraz przenoszenia danych, jeżeli przepisy dają takie uprawnienie.",
      "Użytkownik może także cofnąć zgodę na analitykę. Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.",
      "Jeżeli użytkownik uzna, że dane są przetwarzane niezgodnie z prawem, może złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.",
    ],
  },
  {
    title: "Newsletter, komentarze i sprzedaż",
    paragraphs: [
      "Strona obecnie nie prowadzi newslettera, systemu kont użytkowników, komentarzy ani sprzedaży. Jeżeli takie funkcje zostaną dodane, polityka prywatności zostanie zaktualizowana przed ich uruchomieniem.",
    ],
  },
];

export const cookiePolicySections: readonly LegalSection[] = [
  {
    title: "Czym są cookies",
    paragraphs: [
      "Cookies to niewielkie pliki lub podobne technologie zapisywane w urządzeniu użytkownika. Mogą służyć do działania strony, zapamiętania wyborów albo tworzenia statystyk odwiedzin.",
    ],
  },
  {
    title: "Jakie cookies planuje wykorzystywać strona",
    items: [
      "niezbędne cookies lub podobne zapisy techniczne, potrzebne do zapamiętania wyboru zgód i prawidłowego działania strony",
      "analityczne cookies Google Analytics lub tagi uruchamiane przez Google Tag Manager, jeżeli użytkownik wyrazi na to zgodę",
      "techniczne mechanizmy Google Search Console, które pomagają sprawdzać widoczność strony w wyszukiwarce i zwykle nie wymagają banera zgody dla odwiedzającego",
    ],
  },
  {
    title: "Zgoda na analitykę",
    paragraphs: [
      "Analityka i tagi marketingowe nie powinny być uruchamiane przed wyrażeniem zgody przez użytkownika. Użytkownik może zaakceptować analitykę albo pozostać przy elementach niezbędnych.",
      "Zgodę można zmienić przyciskiem ustawień cookies w stopce strony albo przez usunięcie danych strony w przeglądarce.",
    ],
  },
  {
    title: "Zarządzanie cookies w przeglądarce",
    paragraphs: [
      "Użytkownik może usuwać i blokować cookies w ustawieniach swojej przeglądarki. Ograniczenie niektórych mechanizmów może wpływać na działanie wybranych funkcji strony.",
    ],
  },
];

export const websiteRulesSections: readonly LegalSection[] = [
  {
    title: "Charakter treści",
    paragraphs: [
      "Treści publikowane na stronie mają charakter hobbystyczny, edukacyjny i informacyjny. Opisują doświadczenia autora z nauką druku 3D i nie są profesjonalną poradą techniczną, prawną ani biznesową.",
    ],
  },
  {
    title: "Prawa autorskie",
    paragraphs: [
      "Teksty, grafiki, zdjęcia i układ strony są chronione prawem autorskim, chyba że przy danym materiale wskazano inaczej. Cytowanie krótkich fragmentów jest dozwolone na zasadach prawa cytatu z podaniem źródła.",
      "Zdjęcia i grafiki na stronie mają być własne albo generowane. Jeżeli pojawią się materiały zewnętrzne, powinny być użyte zgodnie z licencją i opisane przy publikacji.",
    ],
  },
  {
    title: "Współprace i linki afiliacyjne",
    paragraphs: [
      "Jeżeli na stronie pojawią się współprace, recenzje sprzętu przekazanego przez firmę, linki afiliacyjne albo materiały sponsorowane, będą oznaczane wprost przy danym wpisie lub materiale.",
      "Celem jest jasne oddzielenie zwykłych notatek z nauki od treści, za które autor otrzymał wynagrodzenie, sprzęt, zniżkę, prowizję albo inną korzyść.",
    ],
  },
  {
    title: "Linki zewnętrzne",
    paragraphs: [
      "Strona może zawierać linki do zewnętrznych serwisów, dokumentacji, sklepów, filmów lub narzędzi. Administrator nie odpowiada za treści, polityki prywatności ani działanie zewnętrznych stron.",
    ],
  },
];
