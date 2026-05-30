import { learningTopics } from "@/features/home/content";

export function TopicsSection() {
  return (
    <section
      className="rounded-[2.5rem] bg-mint px-5 py-20 sm:mx-5 sm:px-8 lg:mx-8 lg:px-12 lg:py-24"
      id="tematy"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-label">Tematy</p>
          <h2 className="section-title mt-4">
            O czym będziemy pisać na blogu?
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {learningTopics.map((topic, index) => (
            <article
              className="group rounded-3xl border-2 border-ink/10 bg-cream p-6 transition-transform duration-300 hover:-translate-y-1"
              key={topic.title}
            >
              <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-sun font-display text-lg font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-bold">
                {topic.title}
              </h3>
              <p className="mt-4 leading-7 text-ink/68">{topic.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
