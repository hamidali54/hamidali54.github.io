import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  as?: "h1" | "h2" | "span" | "p";
  className?: string;
}

export function GlitchText({
  children,
  as: Tag = "span",
  className,
}: GlitchTextProps) {
  return (
    <Tag className={cn("glitch", className)} data-text={children}>
      {children}
    </Tag>
  );
}
