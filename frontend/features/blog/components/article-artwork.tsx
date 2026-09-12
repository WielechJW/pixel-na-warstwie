import styles from "@/features/blog/components/article-artwork.module.css";

type ArticleArtworkProps = {
  slug: string;
  className?: string;
};

const artworkLabels = ["Forma / Materiał", "Geometria / Proces", "Warstwa / Struktura"];

export function ArticleArtwork({ slug, className = "" }: ArticleArtworkProps) {
  const variant = (slug.length + (slug.charCodeAt(0) || 0)) % 3;

  return (
    <div
      aria-hidden="true"
      className={`${styles.artwork} ${className}`}
      data-variant={variant}
    >
      <span className={styles.label}>{artworkLabels[variant]}</span>
      <svg fill="none" viewBox="0 0 480 300">
        <g opacity="0.07" stroke="var(--ink)" strokeWidth="0.8">
          {Array.from({ length: 12 }, (_, index) => (
            <g key={index}>
              <path d={`M ${-150 + index * 65} 120 l 390 200`} />
              <path d={`M ${630 - index * 65} 120 l -390 200`} />
            </g>
          ))}
        </g>
        <ellipse cx="246" cy="246" fill="var(--ink)" opacity="0.06" rx="112" ry="24" />
        <g className={styles.object}>
          {variant === 0 && <FilamentStudy />}
          {variant === 1 && <LayerStudy />}
          {variant === 2 && <BlockStudy />}
        </g>
        <g opacity="0.4" stroke="var(--ink)" strokeWidth="0.7">
          <path d="M 24 269 h 12 m -6 -6 v 12 M 444 269 h 12 m -6 -6 v 12" />
        </g>
      </svg>
    </div>
  );
}

function FilamentStudy() {
  return (
    <g transform="translate(240 155) rotate(-22)">
      {Array.from({ length: 14 }, (_, index) => (
        <ellipse
          cx="0"
          cy={58 - index * 5}
          fill="var(--art-mid)"
          key={index}
          rx="84"
          ry="49"
          stroke="var(--art-accent)"
          strokeWidth="0.8"
        />
      ))}
      <ellipse cy="-12" fill="var(--art-light)" rx="84" ry="49" />
      {[72, 62, 52].map((radius) => (
        <ellipse
          cy="-12"
          key={radius}
          opacity="0.35"
          rx={radius}
          ry={radius * 0.58}
          stroke="var(--art-accent)"
          strokeWidth="0.9"
        />
      ))}
      <ellipse cy="-12" fill="var(--art-accent)" rx="31" ry="19" />
      <path d="M -27 -3 Q 0 -20 27 -3 Q 0 14 -27 -3" fill="var(--art-mid)" />
    </g>
  );
}

function LayerStudy() {
  return (
    <g>
      {Array.from({ length: 7 }, (_, index) => {
        const y = 204 - index * 17;
        return (
          <g key={index}>
            <path
              d={`M 139 ${y} L 237 ${y - 51} Q 242 ${y - 54} 247 ${y - 51} L 341 ${y - 3} V ${y + 7} L 247 ${y + 57} Q 241 ${y + 60} 235 ${y + 57} L 139 ${y + 8} Z`}
              fill="var(--art-accent)"
            />
            <path
              d={`M 139 ${y} L 237 ${y - 51} Q 242 ${y - 54} 247 ${y - 51} L 341 ${y - 3} L 247 ${y + 47} Q 241 ${y + 50} 235 ${y + 47} Z`}
              fill={index === 6 ? "var(--art-light)" : "var(--art-mid)"}
              stroke="var(--art-light)"
              strokeOpacity="0.4"
              strokeWidth="0.6"
            />
          </g>
        );
      })}
      <path d="M 181 99 l 61 -31 59 30 -60 32 Z" stroke="var(--art-accent)" strokeOpacity="0.4" />
      <path d="M 203 99 l 39 -20 38 19 -39 21 Z" stroke="var(--art-accent)" strokeOpacity="0.3" />
    </g>
  );
}

function BlockStudy() {
  return (
    <g transform="translate(240 84)">
      <path d="M 0 49 L 96 99 L 0 150 L -96 100 Z" fill="var(--art-light)" />
      <path d="M -96 100 L 0 150 V 174 L -96 124 Z" fill="var(--art-mid)" />
      <path d="M 0 150 L 96 99 V 123 L 0 174 Z" fill="var(--art-accent)" />
      <path d="M -64 83 V 32 L 0 65 V 117 Z" fill="var(--art-mid)" />
      <path d="M 0 65 L 65 32 V 83 L 0 117 Z" fill="var(--art-accent)" />
      <path d="M -64 32 L 0 0 L 65 32 L 0 65 Z" fill="var(--art-light)" />
      <path d="M -32 16 V -19 L 0 -3 V 32 Z" fill="var(--art-mid)" />
      <path d="M 0 -3 L 33 -20 V 15 L 0 32 Z" fill="var(--art-accent)" />
      <path d="M -32 -19 L 0 -35 L 33 -20 L 0 -3 Z" fill="var(--art-light)" />
      <g opacity="0.3" stroke="var(--art-light)" strokeWidth="0.8">
        {Array.from({ length: 8 }, (_, index) => (
          <path d={`M -64 ${38 + index * 6} l 64 33 65 -34`} key={index} />
        ))}
        {Array.from({ length: 4 }, (_, index) => (
          <path d={`M -96 ${106 + index * 5} l 96 50 96 -51`} key={index} />
        ))}
      </g>
    </g>
  );
}
