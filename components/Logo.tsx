export function Logo({ size = 24, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <span className="font-extrabold leading-none tracking-title text-ink" style={{ fontSize: size }}>
      OVR
      <span className="text-accent" style={glow ? { textShadow: '0 0 18px rgb(236 48 19 / .7)' } : undefined}>CLK</span>
    </span>
  );
}
