import { BrutalCard } from "@/components/primitives/BrutalCard";

interface FeedbackCardProps {
  name: string;
  role: string;
  feedback: string;
}

export function FeedbackCard({ name, role, feedback }: FeedbackCardProps) {
  return (
    <BrutalCard>
      <span
        aria-hidden
        className="mb-2 block font-mono text-6xl leading-none text-terminal-signal"
      >
        {"\""}
      </span>
      <p className="font-body text-sm italic leading-relaxed text-terminal-soft">
        {feedback}
      </p>
      <div className="mt-4 border-t border-terminal-border pt-4">
        <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-terminal-text">
          {name}
        </h3>
        <p className="mt-1 text-xs text-terminal-signal">{role}</p>
      </div>
    </BrutalCard>
  );
}
