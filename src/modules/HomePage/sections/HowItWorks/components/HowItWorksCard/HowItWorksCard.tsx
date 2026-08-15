import { cn } from "@/lib/utils";
import { Step } from "../../HowItWorks";

interface Props {
  className?: string;
  step: Step;
  index: number;
}

/**
 *  HowItWorksCard
 *  @param className
 *  @param step
 *  @param index
 */

export default function HowItWorksCard({ className = "", step, index }: Props) {
  const Icon = step.icon;

  return (
    <div
      className={cn(
        "rounded-lg border border-brand/12 bg-brand/10 p-6 lg:p-8",
        className,
      )}
    >
      <div className="w-fit rounded-lg bg-brand/12 p-3">
        <Icon aria-hidden className="text-brand" />
      </div>

      <div className="mt-5 mb-4 flex items-center gap-2">
        <span className="font-mono text-sm font-bold tracking-widest text-brand">
          [{index + 1}]
        </span>
        <h3 className="text-lg font-bold text-sand">{step.title}</h3>
      </div>

      <p className="text-[15px] leading-normal text-sand/60">
        {step.description}
      </p>
    </div>
  );
}
