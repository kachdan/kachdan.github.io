import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function Eyebrow({
  children,
  onDark = false,
}: {
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className={`block h-[6px] w-[3px] shrink-0 ${onDark ? "bg-[#6696e8] dark:bg-accent" : "bg-accent"}`}
      />
      <p
        className={`font-sans font-semibold uppercase text-[12px] leading-[1.2] tracking-[0.1em] ${onDark ? "text-[#6696e8] dark:text-accent" : "text-accent"}`}
      >
        {children}
      </p>
    </div>
  );
}

export function MetaStrip({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="w-full border-t border-b border-rule-strong py-6">
      <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <dt className="text-[12px] leading-[1.5] uppercase tracking-[0.06em] text-caption">
              {item.label}
            </dt>
            <dd className="text-[14px] leading-[1.55] text-body">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function MetricBand({
  metrics,
}: {
  metrics: { figure: string; caption: string; large?: boolean }[];
}) {
  return (
    <div className="w-full overflow-hidden bg-hairline shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.caption} className="bg-panel px-8 py-9">
            <p
              className={`font-serif font-semibold text-accent ${
                m.large
                  ? "text-[40px] leading-[1.1] md:text-[44px]"
                  : "text-[24px] leading-[1.24]"
              }`}
            >
              {m.figure}
            </p>
            <p className="mt-2 text-[14px] leading-[1.55] text-caption">
              {m.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProseSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="w-full">
      <h3 className="max-w-[800px] font-sans font-semibold text-[20px] leading-[1.4] text-heading">
        {heading}
      </h3>
      <p className="mt-3.5 max-w-[800px] text-[16px] leading-[1.65] text-body">
        {children}
      </p>
    </Reveal>
  );
}

export function PullQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <Reveal className="w-full max-w-[800px]">
      <blockquote className="border-l-[3px] border-accent py-2 pl-8">
        <p className="font-serif font-semibold text-[24px] leading-[1.24] text-heading">
          {quote}
        </p>
        <footer className="mt-4 text-[14px] leading-[1.55] text-caption">
          {attribution}
        </footer>
      </blockquote>
    </Reveal>
  );
}

export function DiagramFrame({
  caption,
  topLabel,
  bottomNote,
  children,
}: {
  caption: string;
  topLabel: string;
  bottomNote: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="w-full">
      <p className="font-sans font-medium text-[13px] leading-[1.4] text-heading">
        {caption}
      </p>
      <div className="mt-5 rounded-[4px] border border-hairline bg-panel p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.03)]">
        <p className="text-[12px] leading-[1.5] uppercase tracking-[0.06em] text-caption">
          {topLabel}
        </p>
        <div className="mt-3.5">{children}</div>
        <p className="mt-3.5 text-[12px] leading-[1.5] text-caption">
          {bottomNote}
        </p>
      </div>
    </Reveal>
  );
}
