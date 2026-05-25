export function AboutSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24" id="o-nas">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <p className="section-label">O nas</p>
          <h2 className="section-title mt-4">
            Dwóch braci, jedna pasja i setki warstw pomysłów
          </h2>
        </div>
        <div className="rounded-[2rem] border-2 border-ink/10 bg-white p-7 shadow-[8px_8px_0_#d9eee8] sm:p-10">
          <p className="text-lg leading-8 text-ink/78">
            Pixel na Warstwie powstał z naszej wspólnej zajawki do druku 3D,
            projektowania i tworzenia rzeczy, które wcześniej istniały tylko w
            głowie. Eksperymentujemy, dopracowujemy detale i zamieniamy pomysły
            w namacalne wydruki.
          </p>
          <p className="mt-5 text-lg leading-8 text-ink/78">
            Dla nas druk 3D to nie tylko technologia. To satysfakcja z procesu,
            możliwość zrobienia czegoś własnego i radość z każdej udanej
            warstwy.
          </p>
          <div className="mt-8 border-l-4 border-coral pl-5 font-display text-xl font-bold text-ink">
            Robimy to po bratersku: z cierpliwością, pomysłami i uwagą do
            detalu.
          </div>
        </div>
      </div>
    </section>
  );
}
