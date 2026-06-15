import { FeedbackCard } from "@/components/cards/FeedbackCard";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <div>
      <SectionLabel num="07" />
      <SectionTitle>OUR CLIENTS FEEDBACK.</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <FeedbackCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
