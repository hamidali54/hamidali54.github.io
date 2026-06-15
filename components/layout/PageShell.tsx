import { ScanlineOverlay } from "@/components/primitives/ScanlineOverlay";

interface PageShellProps {
  children: React.ReactNode;
  showScanlines?: boolean;
}

export function PageShell({ children, showScanlines = true }: PageShellProps) {
  return (
    <div className="grid-overlay relative min-h-screen bg-terminal-bg">
      {showScanlines && <ScanlineOverlay />}
      <div className="relative z-10 mx-auto max-w-[1400px]">{children}</div>
    </div>
  );
}
