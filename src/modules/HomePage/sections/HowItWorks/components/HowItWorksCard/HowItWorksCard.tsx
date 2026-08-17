import { cn } from "@/lib/utils";
import { Step } from "../../HowItWorks";

interface Props {
  className?: string;
  step: Step;
  index: number;
}

export default function HowItWorksCard({ className = "", step, index }: Props) {
  const Icon = step.icon;

  return (
    <div
      className={cn(
        "rounded-lg border border-brand/12 bg-brand/10 p-block",
        className,
      )}
    >
      <div className="w-fit rounded-lg bg-brand/12 p-3">
        <Icon aria-hidden className="text-brand" />
      </div>

      <div className="mt-stack mb-title-tight flex items-center gap-2">
        <span className="font-mono text-label font-bold tracking-widest text-brand">
          [{index + 1}]
        </span>
        <h3 className="text-h3 font-bold text-sand">{step.title}</h3>
      </div>

      <p className="text-body text-sand/60">{step.description}</p>
    </div>
  );
}
