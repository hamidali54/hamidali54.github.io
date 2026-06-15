export function ScanlineOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden bg-[repeating-linear-gradient(transparent_0px,transparent_1px,rgba(0,0,0,0.08)_1px,rgba(0,0,0,0.08)_2px)] md:block"
    />
  );
}
