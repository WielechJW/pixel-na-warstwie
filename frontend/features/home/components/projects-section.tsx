import Image from "next/image";

import { projects } from "@/features/home/content";

export function ProjectsSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28" id="realizacje">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="section-label">Realizacje</p>
            <h2 className="section-title mt-4">
              Wydruki, które już nabrały kształtu
            </h2>
          </div>
          <p className="max-w-sm leading-7 text-ink/65">
            Figurki, dekoracje motoryzacyjne i modele przegubowe wykonane
            warstwa po warstwie.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((project) => (
            <figure
              className={`group overflow-hidden rounded-[2rem] border-2 border-ink/10 bg-white p-3 shadow-[5px_5px_0_#e4f5ef] ${
                project.featured
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                  : "lg:col-span-2"
              }`}
              key={project.name}
            >
              <div
                className={`relative overflow-hidden rounded-[1.35rem] bg-white ${
                  project.featured
                    ? "aspect-[4/5] min-h-[390px]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  alt={`${project.name} - realizacja druku 3D Pixel na Warstwie`}
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  fill
                  sizes={
                    project.featured
                      ? "(min-width: 1024px) 34vw, (min-width: 640px) 100vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  src={project.image}
                />
              </div>
              <figcaption className="px-3 pb-3 pt-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-coral">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold">
                  {project.name}
                </h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
