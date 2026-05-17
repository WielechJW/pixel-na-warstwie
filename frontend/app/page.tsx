export default function Home() {
  const pixels = [
    "bg-teal-300",
    "bg-sky-400",
    "bg-amber-300",
    "bg-rose-400",
    "bg-lime-300",
    "bg-fuchsia-400",
    "bg-cyan-200",
    "bg-orange-300",
    "bg-emerald-400",
    "bg-indigo-400",
    "bg-yellow-200",
    "bg-pink-300",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#101014] text-white">
      <section className="relative flex min-h-screen items-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(24,149,128,0.22),transparent_35%),linear-gradient(240deg,rgba(255,184,77,0.2),transparent_32%),radial-gradient(circle_at_76%_18%,rgba(219,39,119,0.2),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-3 border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-teal-100 backdrop-blur">
              Pixel na warstwie
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
              Strona jest w przebudowie
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
              Układamy nowe warstwy, dopieszczamy detale i szykujemy świeże
              miejsce dla kreatywnych projektów. Wrócimy tu z czymś bardziej
              dopracowanym, kolorowym i gotowym do oglądania.
            </p>

            <div className="mt-10 flex text-sm text-zinc-300">
              <div className="border-l-4 border-teal-300 bg-white/7 px-5 py-4 backdrop-blur">
                <span className="block text-xs uppercase tracking-[0.18em] text-zinc-400">
                  Status
                </span>
                <span className="mt-1 block text-base font-semibold text-white">
                  Prace projektowe trwają
                </span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[420px]">
            <div className="absolute inset-0 rotate-3 border border-white/15 bg-white/6 shadow-2xl shadow-black/30 backdrop-blur-md" />
            <div className="absolute inset-5 -rotate-2 bg-[#191920] p-5 shadow-xl">
              <div className="grid h-full grid-cols-6 gap-3">
                {pixels.map((color, index) => (
                  <div
                    className={`${color} shadow-[inset_0_-10px_0_rgba(0,0,0,0.16)]`}
                    key={`${color}-${index}`}
                  />
                ))}
                <div className="col-span-2 row-span-2 bg-white shadow-[inset_0_-12px_0_rgba(0,0,0,0.12)]" />
                <div className="col-span-2 bg-teal-200 shadow-[inset_0_-10px_0_rgba(0,0,0,0.14)]" />
                <div className="row-span-2 bg-rose-500 shadow-[inset_0_-10px_0_rgba(0,0,0,0.16)]" />
                <div className="bg-amber-200 shadow-[inset_0_-10px_0_rgba(0,0,0,0.14)]" />
                <div className="col-span-3 bg-sky-300 shadow-[inset_0_-10px_0_rgba(0,0,0,0.16)]" />
                <div className="col-span-2 bg-lime-300 shadow-[inset_0_-10px_0_rgba(0,0,0,0.16)]" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-8 right-8 h-5 bg-black/35 blur-xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
