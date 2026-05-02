/**
 * SectionGlow. A subtle ambient-light wash positioned in a corner of a
 * section. Premium playful, not kiddish. Each section gets one in a
 * hue from the warm partner palette so the site has visual rhythm
 * without going rainbow.
 *
 * Usage. Place inside a section that has `relative overflow-hidden`.
 *   <SectionGlow color="dawn" corner="top-right" />
 */

const COLOR_TO_RGB: Record<string, string> = {
  sunrise: '255, 92, 57',
  coral: '255, 137, 112',
  peach: '255, 182, 158',
  dawn: '255, 210, 184',
  amber: '245, 158, 11',
  gold: '232, 169, 59',
  rose: '255, 169, 153',
};

const CORNER_POS: Record<string, string> = {
  'top-left': 'top: -20%; left: -20%;',
  'top-right': 'top: -20%; right: -20%;',
  'bottom-left': 'bottom: -20%; left: -20%;',
  'bottom-right': 'bottom: -20%; right: -20%;',
  'top-center': 'top: -30%; left: 50%; transform: translateX(-50%);',
};

export default function SectionGlow({
  color = 'dawn',
  corner = 'top-right',
  size = 720,
  intensity = 0.18,
}: {
  color?: keyof typeof COLOR_TO_RGB;
  corner?: keyof typeof CORNER_POS;
  size?: number;
  intensity?: number;
}) {
  const rgb = COLOR_TO_RGB[color] ?? COLOR_TO_RGB.dawn;
  const pos = CORNER_POS[corner] ?? CORNER_POS['top-right'];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-10"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(ellipse at center, rgba(${rgb}, ${intensity}) 0%, rgba(${rgb}, 0) 60%)`,
        filter: 'blur(40px)',
        ...Object.fromEntries(
          pos
            .split(';')
            .filter(Boolean)
            .map((s) => {
              const [k, v] = s.split(':').map((x) => x.trim());
              return [
                k.replace(/-./g, (m) => m[1].toUpperCase()),
                v,
              ];
            })
        ),
      }}
    />
  );
}
