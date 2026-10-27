import type { ReactNode } from "react";
import { CircleCheck, Database, FileText, Mail } from "lucide-react";

const ICON_SIZE = 48;
const ICON_STROKE = 1.5;

function Tile({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-muted-fill p-6">
      <span className="text-accent">{icon}</span>
      <p className="text-[14px] leading-[1.55] text-body">{label}</p>
    </div>
  );
}

export function FragmentedWorkflow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile
        icon={<FileText size={ICON_SIZE} strokeWidth={ICON_STROKE} className="text-accent" />}
        label="Local Word and Excel work"
      />
      <Tile
        icon={<Database size={ICON_SIZE} strokeWidth={ICON_STROKE} className="text-accent" />}
        label="Multiple systems and data sources"
      />
      <Tile
        icon={<Mail size={ICON_SIZE} strokeWidth={ICON_STROKE} className="text-accent" />}
        label="Memo versions by email"
      />
      <Tile
        icon={<CircleCheck size={ICON_SIZE} strokeWidth={ICON_STROKE} className="text-accent" />}
        label="Approvals by email"
      />
    </div>
  );
}

const loopSteps = [
  {
    tag: "01 · DAN",
    title: "Dan sees a problem",
    description: "On the field, or using it. Says it in his own words.",
    accent: true,
  },
  {
    tag: "02 · CLAUDE",
    title: "Claude writes intent",
    description: "Problem, decisions, acceptance criteria, how it gets verified.",
    accent: false,
  },
  {
    tag: "03 · DAN",
    title: "Dan corrects it",
    description: "Anything that reads as Claude's understanding, not his.",
    accent: true,
  },
  {
    tag: "04 · CLAUDE",
    title: "Claude hands it over",
    description: "With what was rejected, and the thing most likely to break.",
    accent: false,
  },
  {
    tag: "05 · CLAUDE CODE",
    title: "Claude Code builds",
    description: "And writes the tests, and proves each one can fail.",
    accent: false,
  },
  {
    tag: "06 · CLAUDE",
    title: "Claude verifies",
    description: "Reads the live app and the real sheet. Never the report.",
    accent: false,
  },
  {
    tag: "07 · DAN",
    title: "Dan tests it for real",
    description: "Phone, dugout, sunlight. The only test that counts.",
    accent: true,
  },
];

export function TheLoop() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {loopSteps.map((step) => (
        <div
          key={step.tag}
          className={`flex h-full flex-col gap-2 rounded-xl p-5 ${
            step.accent ? "bg-accent-tint" : "bg-muted-fill"
          }`}
        >
          <p
            className={`font-sans font-semibold uppercase text-[11px] leading-[1.2] tracking-[0.08em] ${
              step.accent ? "text-accent" : "text-caption"
            }`}
          >
            {step.tag}
          </p>
          <p className="font-sans font-semibold text-[15px] leading-[1.35] text-heading">
            {step.title}
          </p>
          <p className="text-[13px] leading-[1.5] text-body">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

export function AppShell() {
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col gap-[3px] overflow-hidden rounded-[4px] border border-hairline bg-canvas sm:aspect-[16/8] md:aspect-[16/6]"
    >
      {/* Global header */}
      <div
        className="flex shrink-0 items-start bg-dark-surface px-2.5 pt-2 text-[9px] leading-none text-on-dark"
        style={{ flex: "0 0 7%", minHeight: 22 }}
      >
        Global header
      </div>

      {/* Primary navigation */}
      <div
        className="flex shrink-0 items-start bg-muted-fill px-2.5 pt-2 text-[9px] leading-none text-caption"
        style={{ flex: "0 0 5%", minHeight: 20 }}
      >
        Primary navigation
      </div>

      {/* Body — side panel + main area */}
      <div className="flex min-h-0 flex-1 gap-[3px]">
        {/* Side panel — narrow, full body height */}
        <div
          className="flex shrink-0 flex-col rounded-[4px] bg-muted-fill px-2.5 pt-2"
          style={{ width: "16%", minWidth: 64 }}
        >
          <span className="text-[9px] leading-none text-caption">Side panel</span>
        </div>

        {/* Main area — stacked labelled regions */}
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          {/* Page title — short band */}
          <div
            className="flex items-start rounded-[4px] bg-accent-tint px-2.5 pt-2"
            style={{ flex: "1.5 0 0" }}
          >
            <span className="text-[9px] leading-none text-caption">Page title</span>
          </div>

          {/* Actions — short band */}
          <div
            className="flex items-start rounded-[4px] bg-accent-tint px-2.5 pt-2"
            style={{ flex: "1.5 0 0" }}
          >
            <span className="text-[9px] leading-none text-caption">Actions</span>
          </div>

          {/* Content sections — taller, equal */}
          <div
            className="flex items-start rounded-[4px] bg-accent-tint px-2.5 pt-2"
            style={{ flex: "3 0 0" }}
          >
            <span className="text-[9px] leading-none text-caption">Content section 1</span>
          </div>
          <div
            className="flex items-start rounded-[4px] bg-accent-tint px-2.5 pt-2"
            style={{ flex: "3 0 0" }}
          >
            <span className="text-[9px] leading-none text-caption">Content section 2</span>
          </div>
          <div
            className="flex items-start rounded-[4px] bg-accent-tint px-2.5 pt-2"
            style={{ flex: "3 0 0" }}
          >
            <span className="text-[9px] leading-none text-caption">Content section 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
