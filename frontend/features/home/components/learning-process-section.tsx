import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { learningSteps } from "@/features/home/content";

function LayerStudy() {
  return (
    <div className="mt-9 overflow-hidden rounded-2xl border border-cream/15 bg-cream/[0.035]">
      <div className="flex items-center justify-between gap-3 border-b border-cream/10 px-5 py-4">
        <span className="flex items-center gap-2 text-xs font-medium text-cream/80">
          <Icon className="h-4 w-4 text-brand" name="layers" />
          Z notatnika warsztatu
        </span>
        <span className="font-mono text-[9px] tracking-[0.15em] text-cream/50">
          ILUSTRACJA
        </span>
      </div>

      <div className="relative px-5">
        <div aria-hidden="true" className="absolute left-5 top-5 font-mono text-[9px] leading-5 tracking-[0.08em] text-cream/35">
          STUDIUM WARSTWY
          <br />
          WIDOK / 01
        </div>
        <svg
          aria-hidden="true"
          className="mx-auto h-auto w-full max-w-96 text-brand"
          fill="none"
          viewBox="0 0 400 280"
        >
          <path d="M40 222 200 150 360 222 200 294Z" stroke="currentColor" strokeOpacity=".1" />
          <path d="M70 235 230 163M103 250 263 178M136 265 296 193M40 222 200 294M73 207 233 279M106 192 266 264M139 177 299 249M172 162 332 234" stroke="currentColor" strokeOpacity=".07" />
          <path d="M200 35V248M72 208H333" stroke="currentColor" strokeDasharray="3 6" strokeOpacity=".16" />
          {Array.from({ length: 19 }, (_, index) => {
            const radius = 65 + Math.sin((index / 18) * Math.PI) * 19;

            return (
              <ellipse
                cx="200"
                cy={211 - index * 6.7}
                fill="var(--ink)"
                key={index}
                rx={radius}
                ry="24"
                stroke="currentColor"
                strokeOpacity={0.22 + index * 0.025}
                strokeWidth="1.2"
              />
            );
          })}
          <ellipse cx="200" cy="90.4" fill="currentColor" fillOpacity=".1" rx="65" ry="24" stroke="currentColor" strokeOpacity=".8" />
          <ellipse cx="200" cy="90.4" rx="52" ry="16.5" stroke="currentColor" strokeOpacity=".4" />
          <path d="M262 91H307V62" stroke="currentColor" strokeOpacity=".35" />
          <circle className="motion-safe:animate-[pulse_2s_ease-in-out_2]" cx="264" cy="91" fill="var(--coral)" r="3" />
          <text fill="currentColor" fillOpacity=".6" fontFamily="monospace" fontSize="9" x="292" y="51">0,20 mm</text>
          <path d="M113 122H88V194H113M88 159H78" stroke="currentColor" strokeOpacity=".2" />
        </svg>
      </div>

      <div className="grid grid-cols-3 border-t border-cream/10">
        {[
          ["Materiał", "PLA"],
          ["Warstwa", "0,20 mm"],
          ["Podejście", "Jedna zmiana"],
        ].map(([label, value], index) => (
          <div className={`px-4 py-4 sm:px-5 ${index > 0 ? "border-l border-cream/10" : ""}`} key={label}>
            <p className="text-[10px] text-cream/50">{label}</p>
            <p className="mt-1.5 text-xs font-medium text-cream/90">{value}</p>
          </div>
        ))}
      </div>
      <p className="border-t border-cream/10 px-5 py-3 text-[10px] leading-4 text-cream/45">
        Przykład zapisu ustawień podczas testu.
      </p>
    </div>
  );
}

export function LearningProcessSection() {
  return (
    <section
      className="relative overflow-hidden bg-ink px-5 py-20 text-cream sm:px-8 lg:px-12 lg:py-28"
      id="jak-sie-uczymy"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-48 h-140 w-140 rounded-full border border-cream/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-108 w-108 rounded-full border border-cream/5" />
      <div className="section-shell relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <p className="section-label text-brand!">Małe testy, kolejne odkrycia</p>
          <h2 className="section-title section-title-light mt-5 max-w-lg">
            Każda warstwa
            <br />
            czegoś nas uczy.
          </h2>
          <p className="mt-6 max-w-lg leading-7 text-cream/65">
            Jedno pytanie. Jedna zmiana. Kolejna próba. Zapisujemy ustawienia
            i obserwacje, żeby następny wydruk zacząć z odrobinę większą wiedzą.
          </p>
          <LayerStudy />
        </Reveal>

        <Reveal className="lg:pt-3" delay={120}>
          <div className="mb-6 flex items-center gap-3 border-b border-cream/15 pb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            <p className="text-xs font-medium tracking-[0.08em] text-cream/60">
              TAK PRACUJEMY NAD WPISAMI
            </p>
          </div>
          <ol>
            {learningSteps.map((step, index) => (
              <li className="grid grid-cols-[2rem_1fr] gap-5 border-b border-cream/12 py-7 first:pt-2 last:border-b-0 sm:grid-cols-[2.5rem_1fr] sm:gap-6" key={step.title}>
                <span className="pt-1 font-mono text-xs text-brand/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-[-0.035em] text-cream sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-cream/60">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex items-center gap-3 pl-13 text-xs text-brand/80 sm:pl-16">
            <Icon className="h-4 w-4" name="sparkles" />
            I tak, aż zrozumiemy trochę więcej.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
