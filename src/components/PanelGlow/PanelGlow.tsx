export function PanelGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-56 -bottom-56 -z-10 size-136 bg-radial-[closest-side] from-brand/35 from-20% to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 -bottom-64 -z-10 size-120 bg-radial-[closest-side] from-neon/20 from-20% to-transparent"
      />
    </>
  );
}
