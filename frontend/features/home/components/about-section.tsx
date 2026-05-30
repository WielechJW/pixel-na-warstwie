export function AboutSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24" id="o-nas">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <p className="section-label">O nas</p>
          <h2 className="section-title mt-4">
            Dwóch braci, drukarka 3D i dużo pytań po drodze
          </h2>
        </div>
        <div className="rounded-[2rem] border-2 border-ink/10 bg-white p-7 shadow-[8px_8px_0_#d9eee8] sm:p-10">
          <p className="text-lg leading-8 text-ink/78">
            Pixel na Warstwie nie jest teraz sklepem ani ofertą druku na
            zamówienie. To miejsce, w którym porządkujemy naukę druku 3D:
            zapisujemy, co testujemy, jakie ustawienia sprawdzamy i czego
            dowiadujemy się z nieudanych prób.
          </p>
          <p className="mt-5 text-lg leading-8 text-ink/78">
            Chcemy pisać normalnym językiem o rzeczach, które początkującemu
            potrafią zabrać wieczór: przyczepności pierwszej warstwy, profilach
            slicera, temperaturach, filamentach i cierpliwości.
          </p>
          <div className="mt-8 border-l-4 border-coral pl-5 font-display text-xl font-bold text-ink">
            Nie udajemy ekspertów. Uczymy się publicznie, warstwa po warstwie.
          </div>
        </div>
      </div>
    </section>
  );
}
