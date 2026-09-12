import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

export function AboutSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28" id="o-nas">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="section-label">Ludzie za warstwami</p>
            <h2 className="section-title mt-5 max-w-lg">
              Dwóch braci.
              <br />
              Mnóstwo pomysłów.
            </h2>
          </Reveal>
          <Reveal className="max-w-xl lg:pt-10" delay={100}>
            <p className="text-lg leading-8 text-ink/80">
              Zaczęło się od ciekawości: jak zamienić pomysł w coś, co można
              wziąć do ręki? Dziś uczymy się druku 3D i zapisujemy wszystko,
              co odkrywamy po drodze.
            </p>
            <p className="mt-5 leading-7 text-muted">
              Ten blog to nasz wspólny notatnik. Znajdziesz tu pierwsze próby,
              ustawienia, które sprawdzamy, i błędy, do których wracamy.
              Pisane po ludzku, z perspektywy początkujących.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-brand-dark">
              <Icon className="h-4 w-4" name="layers" />
              Uczymy się publicznie, warstwa po warstwie.
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-12 grid grid-cols-3 border-t border-ink/12 pt-7 lg:mt-16 lg:pt-9">
            {[
              ["02", "braci przy projekcie"],
              ["01", "drukarka na start"],
              ["∞", "powodów do odkrywania"],
            ].map(([value, label], index) => (
              <div
                className={`min-w-0 ${index > 0 ? "border-l border-ink/12 pl-5 sm:pl-10 lg:pl-14" : "pr-4"}`}
                key={label}
              >
                <p className="font-display text-4xl font-medium tracking-[-0.06em] sm:text-5xl">
                  {value}
                  {index < 2 && <span className="text-coral">.</span>}
                </p>
                <p className="mt-3 max-w-36 text-xs leading-5 text-muted sm:max-w-none sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
