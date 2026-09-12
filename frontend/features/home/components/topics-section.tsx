import Link from "next/link";

import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { learningTopics } from "@/features/home/content";

const topicIcons: IconName[] = ["box", "sliders", "filament", "layers"];
const topicColors = ["bg-mint", "bg-sun/35", "bg-coral/15", "bg-brand/20"];

export function TopicsSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24" id="tematy">
      <div className="section-shell">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="section-label">Tyle do odkrycia</p><h2 className="section-title mt-4">Od pierwszej warstwy<br />do własnych odkryć.</h2></div>
          <p className="max-w-xs text-sm leading-7 text-muted">Rozkładamy druk 3D na proste tematy. Wybierz ten, który ciekawi Cię najbardziej.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {learningTopics.map((topic, index) => (
            <Reveal className="h-full" delay={index * 70} key={topic.title}>
              <article className="group flex h-full flex-col rounded-[22px] border border-ink/10 bg-white/50 p-6 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_32px_-18px_rgba(32,60,54,0.3)] lg:p-7">
                <div className="mb-9 flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${topicColors[index]}`}><Icon className="h-6 w-6" name={topicIcons[index]} /></span>
                  <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                </div>
                <h3 className="font-display text-xl font-semibold">{topic.title}</h3>
                <p className="mt-3 flex-1 text-[13px] leading-6 text-muted">{topic.text}</p>
                <span aria-hidden="true" className="mt-7 block h-px w-9 bg-ink/20 transition-all duration-300 group-hover:w-full group-hover:bg-brand-dark/40" />
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-7 flex justify-end"><Link className="text-link py-2" href="/blog">Znajdź swoją pierwszą lekturę <Icon className="h-4 w-4" name="arrow-up-right" /></Link></Reveal>
      </div>
    </section>
  );
}
