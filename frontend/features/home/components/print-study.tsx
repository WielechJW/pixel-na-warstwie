import type { CSSProperties } from "react";

import { AnimationStage } from "@/components/ui/animation-stage";
import { Icon } from "@/components/ui/icon";
import styles from "@/features/home/components/print-study.module.css";

function contour(y: number, radius: number, phase = 0, inner = false) {
  return Array.from({ length: 121 }, (_, index) => {
    const angle = index / 120 * Math.PI * 2;
    const ripple = inner ? 0 : Math.cos(angle * 10 + phase) * 5;
    const x = 266 + Math.cos(angle) * (radius + ripple) * 1.28;
    const height = y + Math.sin(angle) * (radius + ripple) * 0.46;
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${height.toFixed(2)}`;
  }).join(" ") + "Z";
}

export function PrintStudy() {
  return (
    <AnimationStage className={styles.stage}>
      <div className={styles.topline}><span>Małe studium warstw</span><Icon className="h-4 w-4" name="plus" /></div>
      <svg aria-hidden="true" className={styles.artwork} fill="none" viewBox="0 0 520 500">
        <defs>
          <linearGradient id="study-mint" x1="110" x2="411" y1="200" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d5edcb" /><stop offset="0.42" stopColor="#a6cead" /><stop offset="1" stopColor="#528c71" />
          </linearGradient>
          <linearGradient id="study-coral" x1="100" x2="395" y1="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f5bb99" /><stop offset="0.55" stopColor="#ed9279" /><stop offset="1" stopColor="#c56e5c" />
          </linearGradient>
          <radialGradient id="study-shadow"><stop stopColor="#203c36" stopOpacity=".19" /><stop offset="1" stopColor="#203c36" stopOpacity="0" /></radialGradient>
          <pattern height="28" id="study-grid" patternUnits="userSpaceOnUse" width="28"><circle cx="1" cy="1" fill="#203c36" opacity=".13" r=".7" /></pattern>
        </defs>
        <path d="M0 0h520v500H0z" fill="url(#study-grid)" />
        <circle cx="265" cy="244" r="175" stroke="#203c36" strokeOpacity=".07" />
        <circle cx="265" cy="244" r="143" stroke="#203c36" strokeOpacity=".05" />
        <path d="M62 413 267 482 458 402M267 430v52" stroke="#203c36" strokeOpacity=".14" />
        <ellipse cx="267" cy="415" fill="url(#study-shadow)" rx="172" ry="46" />
        <g className={styles.sculpture}>
          {Array.from({ length: 43 }, (_, index) => {
            const progress = index / 42;
            const radius = 107 - Math.sin(progress * Math.PI) * 20;
            return <path d={contour(373 - index * 3.7, radius, progress * 3)} fill="url(#study-mint)" key={index} stroke="#37654e" strokeOpacity=".42" strokeWidth=".7" />;
          })}
          <path d={`${contour(217.6, 107, 3)} ${contour(217.6, 74, 0, true)}`} fill="#c9e1bc" fillRule="evenodd" stroke="#37654e" strokeOpacity=".35" strokeWidth=".7" />
          <ellipse cx="266" cy="217" fill="#305544" opacity=".82" rx="94" ry="33" />
          <g className={styles.slice} style={{ "--slice-delay": "-1s" } as CSSProperties}>
            <path d={`${contour(172, 106, 3)} ${contour(172, 74, 0, true)}`} fill="url(#study-mint)" fillRule="evenodd" stroke="#37654e" strokeOpacity=".35" strokeWidth="1" />
            <path d={`${contour(167, 106, 3)} ${contour(167, 74, 0, true)}`} fill="#d2e5c6" fillRule="evenodd" stroke="#37654e" strokeOpacity=".4" strokeWidth=".7" />
          </g>
          <g className={styles.slice} style={{ "--slice-delay": "-2s" } as CSSProperties}>
            <path d={`${contour(111, 106, 3)} ${contour(111, 74, 0, true)}`} fill="#c6755e" fillRule="evenodd" stroke="#a76450" strokeOpacity=".4" strokeWidth="1" />
            <path d={`${contour(104, 106, 3)} ${contour(104, 74, 0, true)}`} fill="url(#study-coral)" fillRule="evenodd" stroke="#b46e58" strokeOpacity=".35" strokeWidth=".7" />
          </g>
        </g>
        <path d="M437 210v148m-4-148h8m-8 148h8" stroke="#39745b" strokeOpacity=".45" />
        <text fill="#39745b" fontFamily="monospace" fontSize="8" letterSpacing="1.5" transform="translate(455 237) rotate(90)">WARSTWA PO WARSTWIE</text>
        <path d="M88 164h42m-42 0v36" stroke="#39745b" strokeDasharray="3 4" strokeOpacity=".5" />
        <circle cx="88" cy="164" fill="#39745b" r="2.5" />
        <text fill="#39745b" fontFamily="monospace" fontSize="8" letterSpacing="1" x="53" y="152">DETAL 01</text>
      </svg>
      <div className={styles.note}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint"><Icon className="h-4 w-4 text-brand-dark" name="layers" /></span>
        <div><p className="text-[11px] font-semibold">Cierpliwość ma warstwy.</p><p className="mt-1 text-[10px] text-muted">A każda czegoś nas uczy.</p></div>
      </div>
      <p className={styles.caption}>Od pomysłu do pierwszej warstwy <span>↗</span></p>
    </AnimationStage>
  );
}
