"use client";

export default function MarketingError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="font-display text-3xl font-bold">Treści są chwilowo niedostępne</h1>
      <p className="mt-5">Spróbuj ponownie za chwilę.</p>
      <button className="button-primary mt-6" onClick={reset} type="button">
        Spróbuj ponownie
      </button>
    </main>
  );
}
