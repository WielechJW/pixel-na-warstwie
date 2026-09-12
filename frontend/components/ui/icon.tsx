import type { SVGProps } from "react";

const paths = {
  "arrow-up-right": "M7 17 17 7M7 7h10v10",
  "arrow-right": "M4 12h16m-6-6 6 6-6 6",
  "arrow-left": "M20 12H4m6-6-6 6 6 6",
  "arrow-down": "M12 4v16m-6-6 6 6 6-6",
  check: "m5 12 4 4L19 6",
  plus: "M12 5v14M5 12h14",
  mail: "M4 5h16v14H4z m0 1 8 7 8-7",
  message: "M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-1 1v-9.5A8.5 8.5 0 0 1 11.5 3h1a8.5 8.5 0 0 1 8.5 8.5ZM8 10h8m-8 4h5",
  sparkles: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4",
  layers: "m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5",
  box: "m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10v9M3 8l9 5 9-5M7.5 5.5l9 5V15",
  sliders: "M5 3v4m0 4v10M12 3v10m0 4v4M19 3v2m0 4v12M2 7h6v4H2zM9 13h6v4H9zM16 5h6v4h-6z",
  filament: "M16 12c0 5-2.7 9-6 9s-6-4-6-9 2.7-9 6-9 6 4 6 9ZM10 3h4c3.3 0 6 4 6 9v9M10 21h4M12 12c0 2.2-.9 4-2 4s-2-1.8-2-4 .9-4 2-4 2 1.8 2 4Z",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2",
  close: "m6 6 12 12M6 18 18 6",
  menu: "M4 8h16M4 16h16",
  external: "M14 3h7v7m0-7L10 14M10 3H4v17h17v-6",
  pause: "M9 5v14M15 5v14",
  play: "m8 5 11 7-11 7V5Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-5 w-5", ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
