import { useEffect, useRef, useState } from "react";
import { ArrowRight, Moon, Sun } from "lucide-react";
import danPhoto from "@/assets/Dan_Kach.png";
import screenCountLight from "@/assets/screen-count-light.png";
import screenCountDark from "@/assets/screen-count-dark.png";
import screenCatcherLight from "@/assets/screen-catcher-light.png";
import screenCatcherDark from "@/assets/screen-catcher-dark.png";
import screenAvailabilityLight from "@/assets/screen-availability-light.png";
import screenAvailabilityDark from "@/assets/screen-availability-dark.png";
import screenBattingLight from "@/assets/screen-batting-light.png";
import screenBattingDark from "@/assets/screen-batting-dark.png";
import Reveal from "./components/Reveal";
import { foremanPhone, officeDesktop, screenShadow } from "./components/fieldReportScreens";

/** Instantly show every pending scroll reveal before an anchor jump. */
function revealAll() {
  window.dispatchEvent(new Event("reveal:all"));
}
import { AppShell, FragmentedWorkflow, TheLoop } from "./components/diagrams";
import {
  DiagramFrame,
  Eyebrow,
  MetaStrip,
  MetricBand,
  ProseSection,
  PullQuote,
} from "./components/primitives";

/* ─── Dark mode hook ──────────────────────────────────────────────────── */

export function useDarkMode() {
  // Always default to dark mode for every visitor. No stored preference or
  // system preference is read on load, and the choice is never persisted.
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;

      // Activate colour transition class for 250ms
      const html = document.documentElement;
      html.classList.add("dark-transition");
      setTimeout(() => html.classList.remove("dark-transition"), 250);

      return next;
    });
  };

  return { isDark, toggle };
}

/* ─── Dark mode toggle ────────────────────────────────────────────────── */

export function DarkModeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  /*
   * Pill is 52 × 30px, knob is 24 × 24px, padding 3px all sides.
   * Dark mode has no border, so content width = 46px; knob travel = 46 − 24 = 22px.
   * Light mode has a 1.5px border; gap from border to knob = padding = 3px,
   * matching the 3px gap from the outer edge to the knob in dark mode.
   * We animate margin-left (0 ↔ 22px) for horizontal movement only —
   * vertical centering comes entirely from the pill's align-items: center.
   */
  const KNOB = 24;
  const PAD = 3;
  const PILL_W = 52;
  const travel = PILL_W - PAD * 2 - KNOB; // 22px in dark mode (no border)

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="fixed top-[13px] right-6 z-50 flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus-visible:rounded-full"
    >
      {/* Pill — flex container; knob centred via align-items */}
      <span
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          padding: `${PAD}px`,
          width: `${PILL_W}px`,
          height: "30px",
          borderRadius: "9999px",
          flexShrink: 0,
          backgroundColor: isDark ? "var(--color-accent)" : "transparent",
          border: isDark ? "none" : "1.5px solid var(--color-hairline)",
          boxSizing: "border-box",
          transition: "background-color 200ms ease, border-color 200ms ease",
        }}
      >
        {/* Knob — flex item; margin-left drives horizontal position */}
        <span
          style={{
            width: `${KNOB}px`,
            height: `${KNOB}px`,
            flexShrink: 0,
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDark ? "#ffffff" : "#8e98a5",
            marginLeft: isDark ? `${travel}px` : "0px",
            transition: "margin-left 200ms ease, background-color 200ms ease",
          }}
        >
          {isDark ? (
            <Sun
              width={14}
              height={14}
              strokeWidth={2}
              style={{ color: "var(--color-accent)", display: "block", flexShrink: 0 }}
            />
          ) : (
            <Moon
              width={14}
              height={14}
              strokeWidth={2}
              style={{ color: "#ffffff", display: "block", flexShrink: 0 }}
            />
          )}
        </span>
      </span>

      {/* Label — vertically centred by the parent button's align-items: center */}
      <span className="hidden sm:inline font-sans font-semibold text-[11px] uppercase leading-none tracking-[0.1em] text-caption select-none">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}

/* ─── Layout shell ────────────────────────────────────────────────────── */

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-20">
      {children}
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */

function Hero() {
  const contact = [
    { label: "EMAIL", value: "kachdan@gmail.com", href: "mailto:kachdan@gmail.com" },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/kachdan",
      href: "https://linkedin.com/in/kachdan",
      external: true,
    },
    { label: "BASED", value: "Charlotte, North Carolina" },
    { label: "OPEN TO", value: "Remote, or hybrid in Charlotte" },
  ] as { label: string; value: string; href?: string; external?: boolean }[];
  return (
    <header className="pt-32 pb-28 md:pt-44 md:pb-36">
      <Shell>
        {/* Mobile-only: photo centred above the eyebrow */}
        <div className="mb-8 flex justify-center md:hidden">
          <div className="photo-ring h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full">
            <img
              src={danPhoto}
              alt="Dan Kachula"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Two-column grid on desktop: text (2fr) | photo (1fr) */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[2fr_1fr] md:gap-14 lg:gap-20">
          {/* Left column: eyebrow → name → paras, unbroken */}
          <div>
            <Eyebrow>
              SENIOR PRODUCT DESIGNER&nbsp;&nbsp;·&nbsp;&nbsp;DESIGN SYSTEMS&nbsp;&nbsp;·&nbsp;&nbsp;AI-ASSISTED
              DESIGN
            </Eyebrow>
            <h1 className="mt-5 font-serif font-semibold text-heading text-[52px] leading-[1.06] sm:text-[64px] md:text-[80px]">
              Dan Kachula
            </h1>
            <div className="mt-6 max-w-[800px] space-y-4">
              <p className="text-[18px] leading-[1.65] text-body">
                I have spent about 20 years making things by hand, most recently 6
                years at Moody's Ratings, where I designed internal platforms for
                people doing regulated work and owned the design system that 26
                designers built on. I use AI as leverage rather than as a shortcut,
                because execution getting cheap is exactly what makes judgment and
                craft worth more.
              </p>
              <p className="text-[18px] leading-[1.65] text-heading">
                The work below is about how I think and how I work with people. The
                screens are evidence, not the point.
              </p>
            </div>
          </div>

          {/* Right column: photo, desktop only, top-aligned */}
          <div className="hidden md:block">
            <div className="photo-ring h-[220px] w-[220px] shrink-0 overflow-hidden rounded-full">
              <img
                src={danPhoto}
                alt="Dan Kachula"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Contact row: full width beneath both columns */}
        <div id="contact" className="section-anchor mt-12 border-t border-rule-strong pt-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {contact.map((c) => (
              <div key={c.label} className="flex flex-col gap-1.5">
                <dt className="text-[12px] leading-[1.5] uppercase tracking-[0.06em] text-caption">
                  {c.label}
                </dt>
                <dd className="text-[14px] leading-[1.55] text-body">
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex min-h-[44px] items-center underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-0"
                    >
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Shell>
    </header>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────── */

const testimonials = [
  {
    quote:
      "I had the privilege of managing Dan for six years. His visual instincts are exceptional, and he pairs them with a depth of technical fluency that makes him unusually effective as a partner to engineering. What I value most about Dan, though, is how he leads.",
    name: "Mandy Linton",
    role: "Product Experience Executive. Managed Dan for 6 years at Moody's Ratings",
  },
  {
    quote:
      "He dived headfirst into working with developers to build AI-assisted development tools and easily applied those workflows to build new design system components with incredible speed and efficiency. He frequently and patiently mentored engineering team members on user experience principles.",
    name: "Adisa Collis",
    role: "AVP at Moody's Ratings",
  },
  {
    quote:
      "Dan is the definition of cool under pressure. He is impeccably polite and an active listener. I've seen him interact with difficult partners with grace and understanding.",
    name: "Andrew Chipley",
    role: "Senior Lead Product Designer, Executive Director at Wells Fargo",
  },
];

function Testimonials() {
  return (
    <section id="recommendations" className="section-anchor bg-dark-surface py-28 md:py-36 dark:border-t dark:border-b dark:border-rule-strong">
      <Shell>
        <Reveal className="max-w-[62ch]">
          <Eyebrow onDark>WHAT IT IS LIKE TO WORK WITH ME</Eyebrow>
          <h2 className="mt-5 font-serif font-semibold text-on-dark text-[32px] leading-[1.2] sm:text-[38px]">
            In other people's words
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#9ba2aa] dark:text-body">
            Every portfolio claims collaboration. These are unedited
            recommendations written by the people who managed me, partnered with
            me and shipped alongside me, across 12 years and 3 companies.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-[4px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.25)] dark:border-hairline dark:bg-muted-fill">
                <blockquote className="text-[16px] leading-[1.65] text-[#c9cdd3] dark:text-body">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-6">
                  <p className="font-medium text-[13px] leading-[1.4] text-on-dark">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-[1.5] text-[#8b929a] dark:text-caption md:min-h-[36px]">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-[12px] leading-[1.5] text-[#8b929a] dark:text-caption">
          All recommendations are public on LinkedIn at{" "}
          <a
            href="https://linkedin.com/in/kachdan"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent dark:decoration-rule"
          >
            linkedin.com/in/kachdan
          </a>
        </p>
      </Shell>
    </section>
  );
}

/* ─── Analyst Platform ─────────────────────────────────────────────────── */

function AnalystPlatform() {
  return (
    <section id="case-analyst-platform" className="section-anchor py-24 md:py-32">
      <Shell>
        <div className="flex flex-col gap-16">
          <Reveal>
            <Eyebrow>CASE STUDY 01&nbsp;&nbsp;·&nbsp;&nbsp;INTERNAL BUSINESS TOOLING</Eyebrow>
            <TagChips tags={workCards[0].tags} className="mt-4" />
            <h2 className="mt-5 max-w-[18ch] font-serif font-semibold text-heading text-[42px] leading-[1.1] sm:text-[50px] md:text-[62px]">
              Digitizing the process would have saved nothing
            </h2>
            <p className="mt-5 max-w-[800px] text-[18px] leading-[1.65] text-body">
              Moody's Ratings. An internal platform consolidating credit review,
              deal intake and rating committee workflows. I was the sole
              designer, end to end, from discovery through launch and post
              release iteration. The users were employees doing regulated work
              against deadlines, not consumers.
            </p>
          </Reveal>

          <MetaStrip
            items={[
              {
                label: "TIMEFRAME",
                value: "Discovery through launch, 2021 to 2022",
              },
              {
                label: "MY ROLE",
                value:
                  "Sole Product Designer. Discovery, IA, interaction design, usability sessions, handoff",
              },
              {
                label: "WORKED WITH",
                value: "Product Owner, engineering team, credit analysts",
              },
              {
                label: "TOOLS",
                value: "Axure, then Figma, FigJam, Miro, Jira, Confluence",
              },
            ]}
          />

          <MetricBand
            metrics={[
              {
                figure: "Discovery led",
                caption: "Multi week workshops with analysts and Product Owners",
              },
              {
                figure: "Measured, not guessed",
                caption: "Journey maps quantified where the time went",
              },
              {
                figure: "Full adoption",
                caption: "Across the analyst group, with onboarding docs",
              },
            ]}
          />

          <ProseSection heading="What was actually happening">
            Analysts were running credit review, deal intake and rating
            committee prep across documents, spreadsheets and email. No single
            step was broken, which is why nobody had filed it as a problem. The
            cost was sitting in the seams between the steps, and seams do not
            show up in a bug queue.
          </ProseSection>

          <DiagramFrame
            caption="Where the work actually lived before"
            topLabel="4 PLACES, NO SHARED STATE"
            bottomNote="Nothing connects these. Memo versions and approvals moved by email, and analysis lived in local files, so the process had no shared state."
          >
            <FragmentedWorkflow />
          </DiagramFrame>

          <PullQuote
            quote="They were living in a fragmented world so to speak. The software was slowing them down."
            attribution="A design colleague who worked alongside me on this platform, close to the end users. Shared with permission, name withheld by request."
          />

          <ProseSection heading="How I framed it">
            I ran multi week discovery workshops with analysts and Product Owners
            and mapped the process people actually followed rather than the one
            that was documented. Then I built journey maps that quantified where
            the hour went, across correspondence, form completion, data logging
            and analysis. That moved the conversation from opinion to evidence,
            and it set the MVP scope, because once you can see which part of the
            flow is eating most of the time, the cut line picks itself.
          </ProseSection>

          <PullQuote
            quote="He has a real knack for gathering requirements and turning them into stunning designs complete with interaction diagrams that take a lot of the pain out of implementation."
            attribution="Will Bowers, Staff Software Engineer. Worked with Dan on the same team."
          />

          <ProseSection heading="The decision I would defend">
            The safe build was a faithful digital copy of the existing process.
            It would have shipped fast and saved almost nothing. I argued instead
            for redesigning around the decisions analysts were actually trying to
            make, and for supporting both the linear path and the non linear one,
            because real analyst work does not run in a straight line. The
            journey maps are what won that argument. Without the numbers it would
            have been my taste against theirs.
          </ProseSection>

          <ProseSection heading="Working with engineering">
            I embedded with the team from sprint 1 and delivered MVP screens in
            parallel with backend development rather than handing over a finished
            spec. We ran moderated usability sessions at MVP and at intervals
            after launch, so assumptions got corrected while correcting them was
            still cheap.
          </ProseSection>

          <ProseSection heading="Where it landed">
            A daily task that took 30 to 60 minutes of manual work came down to
            under 10 minutes in the delivered application, with full adoption
            across the analyst group, supported by onboarding documentation I
            wrote and maintained.
          </ProseSection>

          <div className="mt-8 border-t border-rule-strong pt-8">
            <p className="text-[12px] leading-[1.5] text-caption">
              AI: none. This work ran 2021 to 2022, before any of my AI workflow.
            </p>
            <p className="mt-3 text-[12px] leading-[1.5] text-caption">
              Work shown is redrawn and abstracted. No confidential assets, screens
              or client data are reproduced.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ─── Design System Platform ───────────────────────────────────────────── */

function DesignSystemPlatform() {
  return (
    <section id="case-design-system" className="section-anchor border-t border-rule-strong py-24 md:py-32">
      <Shell>
        <div className="flex flex-col gap-16">
          <Reveal>
            <Eyebrow>CASE STUDY 02&nbsp;&nbsp;·&nbsp;&nbsp;ENTERPRISE DESIGN SYSTEMS</Eyebrow>
            <TagChips tags={workCards[1].tags} className="mt-4" />
            <h2 className="mt-5 max-w-[18ch] font-serif font-semibold text-heading text-[42px] leading-[1.1] sm:text-[50px] md:text-[62px]">
              One source of truth for 3 audiences
            </h2>
            <p className="mt-5 max-w-[800px] text-[18px] leading-[1.65] text-body">
              Moody's Ratings. I owned the design side of an internal design
              system and pushed it from a component library into a shared
              destination that designers, developers and Product Owners all
              worked from. The measure was never how many components existed. It
              was whether a developer starting a new application began from
              something real instead of a blank file.
            </p>
          </Reveal>

          <MetaStrip
            items={[
              { label: "TIMEFRAME", value: "2020 to 2026, ongoing ownership" },
              {
                label: "MY ROLE",
                value:
                  "Design System Lead and Art Director. Token architecture, component ownership, usage guidance, critique facilitation",
              },
              {
                label: "WORKED WITH",
                value:
                  "Lead design system engineer, design partner, designers, developers, Product Owners",
              },
              {
                label: "TOOLS",
                value: "Figma, FigJam, Axure, Angular, Tailwind, VS Code, GitHub",
              },
            ]}
          />

          <MetricBand
            metrics={[
              { figure: "15 to 57", caption: "Components, over 6 years", large: true },
              { figure: "400+", caption: "Published token variables", large: true },
              {
                figure: "4 to 26",
                caption: "Designers the system supported",
                large: true,
              },
            ]}
          />

          <ProseSection heading="The problem was never components">
            There was a library. What there was not was a destination. Designers
            worked in Figma, developers worked in code, and Product Owners had
            nowhere to look at all. Three audiences, three versions of the truth,
            and steady drift between them. Adding components would not have
            fixed that, because the gap was in where people went, not in what
            existed.
          </ProseSection>

          <ProseSection heading="What I argued for, repeatedly">
            One place. I pushed for a single destination where a designer could
            read usage guidance, a developer could pull source, and a Product
            Owner could see the pattern running live rather than described. I was
            not the only person who wanted this and I did not build it alone, but
            I was the one raising it in rooms until it happened, and the live
            preview was the part I kept insisting on. A screenshot in
            documentation tells you a pattern exists. A running preview tells you
            what it does.
          </ProseSection>

          <PullQuote
            quote="His combination of design systems expertise, visual design talent, and technical understanding made him an invaluable collaborator. Together, we modernized our design system and evolved it to support AI-enabled design."
            attribution="Tracy Nunnaley, Experience Design AVP, Design Systems at Moody's Ratings. My closest design partner on the system."
          />

          <ProseSection heading="The architecture decision">
            I architected the tokens in 3 tiers, primitive, semantic and
            typography, across more than 400 published variables. The reason was
            leverage rather than tidiness. When brand or theming changed, the
            change happened once at the primitive layer and travelled everywhere,
            instead of turning into a hunt through hard coded styles. That
            decision is why the system survived a company wide rebrand without
            being rebuilt.
          </ProseSection>

          <ProseSection heading="Building inside a system I did not define">
            During the 2023 to 2024 rebrand I represented the technology design
            team in an effort spanning roughly 15,000 people and several design
            teams. Brand guidance came down finished and my job was to translate
            it into the system so product designers never had to think about it.
            That is a different discipline from authoring a system. It is working
            within constraints somebody else set, at enterprise scale, without
            breaking the teams downstream of you.
          </ProseSection>

          <ProseSection heading="Tables versus cards">
            Our users were analysts who live in spreadsheets, so tables felt
            native and we carried a table heavy pattern into most applications.
            But familiar is not the same as effective. Where the task was
            scanning and comparing rather than reading rows, I pushed cards
            instead, and wrote the guidance for choosing between them. The
            judgment call was not which control looked better. It was which one
            matched the task the analyst was actually doing.
          </ProseSection>

          <ProseSection heading="Accessibility as a default, not a review step">
            I helped set WCAG 2.1 AA as the target and then built compliance into
            the components themselves, hand curating color contrast pair by pair
            so that contrast, focus states, ARIA labelling and field validation
            shipped correct out of the box. I also established a multi signal
            error pattern, field level messaging pairing color with an icon
            rather than color alone, reinforced by page level alerts. If
            accessibility depends on every designer remembering, it fails. If it
            is in the component, it holds.
          </ProseSection>

          <DiagramFrame
            caption="The reusable app shell a new application starts from"
            topLabel="ONE SHELL, REUSED ACROSS APPLICATIONS"
            bottomNote="Every application started from this same shell."
          >
            <AppShell />
          </DiagramFrame>

          <ProseSection heading="Where it landed">
            A developer starting a new application no longer started from nothing.
            They set up their environment, went to the documentation site, chose
            an app shell that fit the use case, and pulled source alongside the
            designer working on the same pattern. Structure and setup were
            already decided, so the team began well into the build rather than
            at zero.
          </ProseSection>

          <div className="mt-8 border-t border-rule-strong pt-8">
            <p className="text-[13px] leading-[1.65] text-caption">
              Credit where it belongs. The system and the documentation platform
              were team work, built with a lead design system engineer, a design
              partner I co-led the Figma migration with, and the designers who
              used and pressured it. My part was the design side ownership, the
              token architecture, and the argument for a single destination.
            </p>
            <p className="mt-3 text-[12px] leading-[1.5] text-caption">
              AI: none in the system itself. Components, tokens and usage
              guidance were built by hand, first in Axure and then rebuilt in
              Figma, with the token architecture worked out over several
              iterations. Claude Code, run in a VS Code terminal, came in at the
              end, generating HTML prototypes against the finished system, which
              is what led to the AI-assisted editor in case study 03.
            </p>
            <p className="mt-3 text-[12px] leading-[1.5] text-caption">
              Work shown is redrawn and abstracted. No confidential assets,
              screens or client data are reproduced.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ─── Pitch Count App ──────────────────────────────────────────────────── */

const appScreens = [
  {
    key: "count",
    light: screenCountLight,
    dark: screenCountDark,
    caption: "Mid outing. The count, and what it costs in rest.",
    alt: "Count screen showing 34 pitches mid outing, with a rest day scale above the number.",
  },
  {
    key: "catcher",
    light: screenCatcherLight,
    dark: screenCatcherDark,
    caption: "Setting the catcher, one tap from the count.",
    alt: "Bottom sheet asking who is catching, listing the roster with innings caught.",
  },
  {
    key: "availability",
    light: screenAvailabilityLight,
    dark: screenAvailabilityDark,
    caption: "Who can pitch today, with rest days and the catcher rule applied.",
    alt: "Team availability list showing players available, resting until Tuesday, or ineligible after catching four innings.",
  },
  {
    key: "batting",
    light: screenBattingLight,
    dark: screenBattingDark,
    caption:
      "When we're batting. Balls, strikes and outs for the batter at the plate.",
    alt: "Batting screen showing three balls, two strikes and one out in the first inning.",
  },
];

function ScreenStrip() {
  // Hairline + drop shadow differ per mode; both layered into one box-shadow.
  const shadow =
    "shadow-[0_0_0_1px_rgba(27,32,39,0.10),0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_12px_32px_rgba(0,0,0,0.35)]";

  return (
    <Reveal className="w-full">
      {/* Below 1024px: single centered column. 1024px+: four in a row, cells
          21.25% wide with a 5% gap, so 4×272 + 3×64 = 1280 at full width and
          everything scales proportionally when the content area is narrower. */}
      <div className="flex flex-col items-center gap-12 lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-[5%] lg:gap-y-0">
        {appScreens.map((screen) => (
          <figure key={screen.key} className="w-[272px] lg:w-full">
            <img
              src={screen.light}
              alt={screen.alt}
              className={`block w-full rounded-[28px] dark:hidden ${shadow}`}
            />
            <img
              src={screen.dark}
              alt={screen.alt}
              className={`hidden w-full rounded-[28px] dark:block ${shadow}`}
            />
            <figcaption className="mt-4 text-[12px] leading-[1.5] text-caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-[12px] leading-[1.5] text-caption">
        Real screens from the live app, with a demo roster. The visual direction
        was mine. Claude built it in Figma, and I corrected it.
      </p>
    </Reveal>
  );
}

function PitchCountApp() {
  return (
    <section id="case-ai-build" className="section-anchor border-t border-rule-strong py-24 md:py-32">
      <Shell>
        <div className="flex flex-col gap-16">
          <Reveal>
            <Eyebrow>CASE STUDY 03&nbsp;&nbsp;·&nbsp;&nbsp;DESIGNING WITH AI</Eyebrow>
            <TagChips tags={workCards[2].tags} className="mt-4" />
            <h2 className="mt-5 max-w-[18ch] font-serif font-semibold text-heading text-[42px] leading-[1.1] sm:text-[50px] md:text-[62px]">
              The roles collapsed. Mine did not.
            </h2>
            <p className="mt-5 max-w-[800px] text-[18px] leading-[1.65] text-body">
              A pitch count app for a youth baseball team, built in September 2026
              and in use at real games. The league caps how many pitches a child
              may throw in a day and sets mandatory rest before he can pitch
              again, so a wrong count forfeits the game and risks a child's arm.
              It runs on a phone in a dugout, one handed, in the sun. It's one
              coach's tool for one team, not a product. The point is the method.
            </p>
          </Reveal>

          <MetaStrip
            items={[
              { label: "TIMEFRAME", value: "11 days, September 2026" },
              {
                label: "MY ROLE",
                value:
                  "Product owner and designer. Every scope and rules call, design direction, and field testing",
              },
              {
                label: "WORKED WITH",
                value: "Claude in chat, and Claude Code",
              },
              {
                label: "TOOLS",
                value:
                  "Figma, Notion, GitHub, VS Code, Google Sheets, Claude, Claude Code",
              },
            ]}
          />

          <MetricBand
            metrics={[
              {
                figure: "47",
                caption: "Tickets written, each with its own intent file",
                large: true,
              },
              { figure: "34", caption: "Shipped in 11 days", large: true },
              {
                figure: "3",
                caption: "Top priority bugs caught before a game",
                large: true,
              },
            ]}
          />

          <ScreenStrip />

          <ProseSection heading="What it replaced">
            Before the app: a paper scorebook, a handheld umpire clicker, and the
            rest day math done from memory. The cap and the rest window both
            depend on the count, so the math runs on every pitch, while someone
            is talking at you and the next batter is walking up.
          </ProseSection>

          <ProseSection heading="Nine roles, three participants">
            On a normal team this would be 9 people: product owner, UX designer,
            design systems, business analyst, front end engineer, QA, independent
            verification, accessibility, and field testing. Here there were 3
            participants: me, Claude in chat, and Claude Code. They did the
            executing. I did the deciding. Neither of them made a scope call or
            signed anything off.
          </ProseSection>

          <Reveal className="w-full">
            <h3 className="max-w-[800px] font-sans font-semibold text-[20px] leading-[1.4] text-heading">
              Where I overruled it, and where it overruled me
            </h3>
            <p className="mt-3.5 max-w-[800px] text-[16px] leading-[1.65] text-body">
              Claude built the design system in Figma, 12 component sets and 74
              states in light and dark, with every color an alias and no raw hex
              anywhere. I set its direction and corrected it where it drifted,
              including restructuring the token system against a standard I'd used
              professionally, and moving a control to where I actually looked for
              it rather than where taxonomy said it belonged. I also overruled a
              suggested backup before a bulk write, where the caution cost more
              than it saved.
            </p>
            <p className="mt-4 max-w-[800px] text-[16px] leading-[1.65] text-body">
              It overruled me once, with evidence. I chose a dark mode blue that
              measured 1.88:1 against its own background. The label on it would
              have been readable and the button would have had no shape. A
              different step passed both.
            </p>
          </Reveal>

          <ProseSection heading="Intent before code">
            Every ticket went through the same loop, about 40 times in 11 days. I
            saw a problem, on the field or while using it, and said it in my own
            words. Claude wrote an intent file: the problem, the decisions and who
            made them, and how it would be verified. I corrected anything that
            read as Claude's understanding rather than mine. Claude Code built it
            and proved each test could fail. Claude verified the live app, never
            the build report. Then I tested it on my phone, at a game. Notion was
            the board of record, with backlog, ready, in progress, blocked and
            done, and the intent files live in git, so every decision has a date
            and a history.
          </ProseSection>

          <DiagramFrame
            caption="One pass per ticket. It ran about 40 times in 11 days."
            topLabel="THE LOOP"
            bottomNote="Dan decides, corrects, and is the only one who can test it where it is used. Claude in chat and Claude Code execute. Neither decides scope, and neither signs anything off."
          >
            <TheLoop />
          </DiagramFrame>

          <ProseSection heading="A green check is not evidence">
            Six times a test passed while looking at the wrong thing. A stale
            local server serving an old build. A check reading the previous frame.
            A syntax checker parsing a 743 byte file instead of the 89 KB one,
            which let 2 edits through with unbalanced braces.
          </ProseSection>

          <PullQuote
            quote="A check you have not seen fail is not a check."
            attribution="The rule Claude Code wrote for itself, after the sixth time."
          />

          <ProseSection heading="Only one of us could go outside">
            The data model was wrong, and only a field test found it. The app
            tracked players and pitch counts, which are nouns. A game is a
            sequence of moments: who is pitching now, who is catching now, which
            inning. The rule that bites hardest, that a catcher who has caught
            more than 3 innings cannot then pitch, is about a moment, and the app
            had nowhere to put it. No tooling surfaced that. Standing in a dugout
            did.
          </ProseSection>

          <ProseSection heading="Where it landed">
            Live and in use at real games, for one team. Some of the sharpest bugs
            were found by me using it, not by tooling. It cost 2 Claude
            subscriptions, a domain, and 11 evenings. What I'd claim from it isn't
            speed, since 11 days came from one project, in a domain I already
            knew, with scope I controlled completely. What I'd claim is where the
            line sits. The machines can execute almost everything. Deciding and
            field testing still don't delegate.
          </ProseSection>

          <div className="mt-8 border-t border-rule-strong pt-8">
            <p className="text-[13px] leading-[1.65] text-caption">
              Built with Claude in chat and Claude Code. Screenshots use a demo
              roster, and no real team or player names appear anywhere in this
              case study.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}


/* ─── Case Study 04: Field reporting app ──────────────────────────────── */

function FieldScreenStrip() {
  const picks = [foremanPhone[0], foremanPhone[2], foremanPhone[3], foremanPhone[7]];
  return (
    <Reveal className="w-full">
      <div className="flex flex-col items-center gap-12 lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-[5%] lg:gap-y-0">
        {picks.map((s) => (
          <figure key={s.label} className="w-[272px] lg:w-full">
            <img
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              loading="lazy"
              className={`block h-auto w-full ${screenShadow}`}
            />
            <figcaption className="mt-4 text-[12px] leading-[1.5] text-caption">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

function OfficeScreen() {
  const s = officeDesktop[0];
  return (
    <Reveal className="w-full">
      <figure>
        <img
          src={s.src}
          alt={s.alt}
          width={s.w}
          height={s.h}
          loading="lazy"
          className={`block h-auto w-full ${screenShadow}`}
        />
        <figcaption className="mt-4 text-[12px] leading-[1.5] text-caption">
          Office dashboard · {s.label}
        </figcaption>
      </figure>
    </Reveal>
  );
}

function FieldReportApp() {
  return (
    <section id="case-field-report" className="section-anchor border-t border-rule-strong py-24 md:py-32">
      <Shell>
        <div className="flex flex-col gap-16">
          <Reveal>
            <Eyebrow>CASE STUDY 04&nbsp;&nbsp;·&nbsp;&nbsp;CLIENT WORK</Eyebrow>
            <TagChips tags={workCards[3].tags} className="mt-4" />
            <h2 className="mt-5 max-w-[18ch] font-serif font-semibold text-heading text-[42px] leading-[1.1] sm:text-[50px] md:text-[62px]">
              The report was never the problem. Sharing it was.
            </h2>
            <p className="mt-5 max-w-[800px] text-[18px] leading-[1.65] text-body">
              A commercial construction subcontractor in Charlotte, with about 10
              staff, 3 foremen running daily crews and 7 active job sites. The
              owner wanted a written end-of-day report from every foreman, every
              workday, with photos filed into each job's folder. I designed and
              built it end to end, from the first plan to a real report sent from
              a company iPhone in 6 days.
            </p>
          </Reveal>

          <MetaStrip
            items={[
              { label: "TIMEFRAME", value: "6 days, October 2026" },
              {
                label: "MY ROLE",
                value:
                  "Sole designer and builder. Discovery, design, the working app, Microsoft 365 setup, device rollout, testing",
              },
              {
                label: "WORKED WITH",
                value:
                  "The Owner, the Operations Manager as product owner, and Claude in the desktop app",
              },
              {
                label: "TOOLS",
                value: "Figma, Claude, GitHub, Microsoft 365, SharePoint, Apple Business",
              },
            ]}
          />

          <MetricBand
            metrics={[
              {
                figure: "6",
                caption: "Days from the first plan to a real report on a company iPhone",
                large: true,
              },
              { figure: "171", caption: "Automated checks passing before rollout", large: true },
              {
                figure: "0",
                caption: "New paid software. It runs on the Microsoft 365 they already had",
                large: true,
              },
            ]}
          />

          <FieldScreenStrip />

          <ProseSection heading="Before: paper, then a text thread">
            It started on paper, with forms the foremen filled out. Then everyone
            moved to text messages, so every report arrived as a text and sat on
            the Owner's phone among everything else. Nobody could see at a glance
            who had reported, or what a site needed tomorrow.
          </ProseSection>

          <ProseSection heading="The real problem was the general contractor">
            Every general contractor expects a simple PDF report for their
            project, and there was no way to turn a thread of texts from 3
            foremen into one. Now the Owner opens a report on his phone, iPad or
            computer, taps Download PDF, and sends it to the GC by text or email.
          </ProseSection>

          <ProseSection heading="Listening between the lines">
            The Operations Manager owned the ask. Most of the requirements came
            through texts and conversations, so I listened for the pain points
            underneath and asked leading questions until the brief was clear. A
            foreman had to finish in under 3 minutes on a phone, talking instead
            of typing, with tap targets big enough for gloves. It had to use the
            Microsoft accounts they already had, with no new logins, and file
            everything into the job folders the office already used. A paid field
            reporting app was considered and turned down.
          </ProseSection>

          <ProseSection heading="Pick a job, don't type it">
            The Operations Manager first wanted foremen to type the job name. Two
            foremen typing the same job two slightly different ways would create
            two jobs and split one project's reports across two folders. I
            suggested a pre-filled job list instead, since picking is faster than
            typing and can't produce a typo. After seeing it, she said it was
            better than she had imagined. New jobs take a few seconds to add from
            the office dashboard, and a foreman can request one that's missing,
            which the office approves or merges.
          </ProseSection>

          <ProseSection heading="A rapid assessment, on my phone">
            I designed in Figma first, set up a small design system Claude could
            reuse, and turned the screens into a clickable prototype on my phone
            and an iPad. When the Owner came by, I handed him my phone and asked
            him to be a foreman and fill out a report. He found the voice-to-text
            hint under the fields on his own and used it. When he got to photos,
            he said he sometimes shoots video, because it shows the work better.
            Video was in the app the same day: up to 5 videos per report, 3
            minutes each, alongside up to 30 photos.
          </ProseSection>

          <ProseSection heading="What got cut">
            Hours and crew count were added early, then cut by the Operations
            Manager to keep the report under 3 minutes. Yes and no answers became
            buttons, after a test showed that tapping No opened the keyboard.
            Each answer now redraws only its own card, because before the fix the
            page could jump 170 pixels under the user's thumb.
          </ProseSection>

          <ProseSection heading="One app, two jobs">
            Foremen get a short report: date, job, work done as a numbered list,
            3 yes or no checks for materials, delays and safety, tomorrow's plan,
            and photos and videos. A forgotten day can be sent up to 30 days late,
            and the office sees it marked as late. The office gets a dashboard:
            who reported today and who hasn't, what each site needs, every report
            with search and filters, the job list, and a weekly view of who
            reported each day.
          </ProseSection>

          <OfficeScreen />

          <ProseSection heading="Inside their Microsoft 365">
            Everyone signs in with the Microsoft account they already use for
            email. Reports, photos and videos live in their own SharePoint, filed
            into the existing job folders, so their data never leaves their
            tenant. What each person sees comes from their Microsoft job title, so
            a new foreman lands on the right screen without any setup. Dynamic
            groups would have needed a paid tier, and reading the job title gave
            the same result for free. Apple Business puts the app on company
            iPhones and iPads as a home screen icon, with no App Store.
          </ProseSection>

          <ProseSection heading="Testing it as a foreman">
            Automated checks prove the code does what it says. They can't tell you
            what it's like to fill out a report at the end of a long day on a job
            site. So I enrolled a real company iPhone through Apple Business, set
            it up the way a foreman's phone would be, and signed in with a
            dedicated test account through Microsoft Authenticator. Then I used it
            the way a foreman would, looking for anything slow, confusing or easy
            to get wrong, including going back to send a report for a day I had
            missed. I sent a real report with photos and a video, and it appeared
            on the office dashboard right away, filed in the right job folder.
            That pass found a couple of bugs the automated checks hadn't. Once
            they were fixed and the test data was cleared out, it went to the
            company's phones.
          </ProseSection>

          <ProseSection heading="Where it landed">
            A working first version, tested end to end and deployed to the
            company's phones. 126 automated checks across phone, iPad and
            desktop, and 45 more against a simulated Microsoft and SharePoint. An
            independent QA pass found more than 10 issues, all fixed, including
            reports lost when a phone's storage was full and drafts wiped at
            midnight. A pilot with one foreman is next, so there are no usage
            numbers yet, and I won't claim any until there are.
          </ProseSection>

          <Reveal>
            <a
              href="/field-report/"
              className="group inline-flex min-h-[44px] items-center gap-2 text-[16px] font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              See every screen
              <ArrowRight
                width={18}
                height={18}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>

          <div className="mt-8 border-t border-rule-strong pt-8">
            <p className="text-[13px] leading-[1.65] text-caption">
              Designed in Figma and built with Claude in the desktop app. Client
              work shared without the client's name. The screens use an invented
              company, Ridgeline Interiors, with invented people and jobs.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ─── Work index, chips, nav ───────────────────────────────────────── */

const workCards = [
  {
    href: "#case-analyst-platform",
    heading: "Case Study 01 · Analyst platform",
    tags: ["Financial services", "Internal tooling", "Regulated workflows", "Sole designer"],
    line: "A daily task cut from 30 to 60 minutes to under 10, with full analyst adoption",
  },
  {
    href: "#case-design-system",
    heading: "Case Study 02 · Enterprise design system",
    tags: ["Design systems", "Tokens", "Accessibility", "Angular and Tailwind"],
    line: "15 to 57 components, 400+ tokens, supporting 4 to 26 designers",
  },
  {
    href: "#case-ai-build",
    heading: "Case Study 03 · Designing with AI",
    tags: ["AI-assisted build", "Claude and Claude Code", "0 to 1", "Field tested"],
    line: "34 tickets shipped in 11 days, live and in use at real games",
  },
  {
    href: "#case-field-report",
    heading: "Case Study 04 · Field reporting app",
    tags: ["Client project", "Field operations", "Microsoft 365", "0 to 1"],
    line: "From a text thread to a one-tap PDF for the general contractor, designed and shipped in 6 days",
  },
];

function TagChips({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-[4px] bg-muted-fill px-2.5 py-1 text-[12px] leading-[1.4] text-body"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function WorkIndex() {
  return (
    <section id="work" className="section-anchor pb-8 md:pb-12">
      <Shell>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {workCards.map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                onClick={revealAll}
                className="group flex h-full flex-col gap-4 rounded-[4px] border border-hairline bg-panel p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <h2 className="text-[17px] font-semibold leading-[1.4] text-heading transition-colors group-hover:text-accent">
                  {c.heading}
                </h2>
                <TagChips tags={c.tags} />
                <p className="text-[15px] leading-[1.6] text-body">{c.line}</p>
              </a>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

const navLinks = [
  { id: "work", label: "Work" },
  { id: "case-analyst-platform", label: "Analyst platform" },
  { id: "case-design-system", label: "Design system" },
  { id: "case-ai-build", label: "Designing with AI" },
  { id: "case-field-report", label: "Field reporting" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];

function TopNav() {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("header");
      setShown(!!hero && hero.getBoundingClientRect().bottom <= 0);
      // Contact lives inside the hero, so it is never "in view" once the nav shows.
      // A section counts as current once its top passes 40% of the way down
      // the screen. At the very bottom the last section can never get that
      // high, so it wins whenever the page is scrolled all the way down.
      const sections = navLinks.slice(0, 6);
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const l of sections) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = l.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && current) current = sections[sections.length - 1].id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // On phones the links scroll sideways. Keep the current one in view.
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const link = list.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!link) return;
    const left = link.offsetLeft - list.offsetLeft;
    const right = left + link.offsetWidth;
    if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: Math.max(0, left - 24), behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Sections"
      className={`fixed inset-x-0 top-0 z-40 h-14 border-b border-hairline bg-canvas transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
      {...(!shown ? { inert: true } : {})}
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center pl-6 pr-[88px] sm:pl-10 sm:pr-[180px] lg:pl-20">
        <ul
          ref={listRef}
          className="no-scrollbar flex h-full min-w-0 flex-1 items-center gap-6 overflow-x-auto whitespace-nowrap [mask-image:linear-gradient(to_right,black_80%,transparent)] md:gap-8 md:[mask-image:none]"
        >
          {navLinks.map((l) => (
            <li key={l.id} className="h-full">
              <a
                href={`#${l.id}`}
                onClick={revealAll}
                aria-current={active === l.id ? "location" : undefined}
                className={`flex h-full items-center text-[13px] leading-none transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                  active === l.id ? "text-accent" : "text-caption"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─── App root ─────────────────────────────────────────────────────────── */

/* ─── Deep links ───────────────────────────────────────────────────────── */

/**
 * The page is built by React after the browser has already tried to jump to
 * the #section in the URL, so on a fresh load the jump finds nothing and the
 * visitor lands at the top. Re-run the jump once the page exists, and again
 * once images have loaded, since the screenshots push sections down.
 */
function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const jump = () => {
      const el = document.getElementById(id);
      if (!el) return;
      revealAll();
      el.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
    };
    const frame = requestAnimationFrame(jump);
    if (document.readyState !== "complete") {
      window.addEventListener("load", jump, { once: true });
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", jump);
    };
  }, []);
}

export default function App() {
  const { isDark, toggle } = useDarkMode();
  useInitialHashScroll();

  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed grid-paper texture — behind all content, hidden from screen readers */}
      <div aria-hidden="true" className="page-texture" />
      <DarkModeToggle isDark={isDark} toggle={toggle} />
      <TopNav />
      <Hero />
      <WorkIndex />
      <AnalystPlatform />
      <DesignSystemPlatform />
      <PitchCountApp />
      <FieldReportApp />
      <Testimonials />
    </div>
  );
}
