import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowLeft } from "lucide-react";
import { DarkModeToggle, Shell, useDarkMode } from "./App";
import { Eyebrow } from "./components/primitives";
import {
  foremanIpad,
  foremanPhone,
  officeDesktop,
  officePhone,
  screenShadow,
  type Screen,
} from "./components/fieldReportScreens";
import "./index.css";

function ScreenGroup({
  title,
  screens,
  cols,
}: {
  title: string;
  screens: Screen[];
  cols: string;
}) {
  return (
    <section className="border-t border-rule-strong pt-10">
      <h2 className="font-sans font-semibold text-[20px] leading-[1.4] text-heading">{title}</h2>
      <ul className={`mt-8 grid items-start gap-x-8 gap-y-12 ${cols}`}>
        {screens.map((s) => (
          <li key={s.label}>
            <figure>
              <a
                href={s.src}
                target="_blank"
                rel="noopener"
                className="block rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={`${s.label}, open full size`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  loading="lazy"
                  className={`block h-auto w-full ${screenShadow}`}
                />
              </a>
              <figcaption className="mt-4 text-[12px] leading-[1.5] text-caption">{s.label}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FieldReportPage() {
  const { isDark, toggle } = useDarkMode();
  return (
    <div className="relative min-h-screen w-full">
      <div aria-hidden="true" className="page-texture" />
      <DarkModeToggle isDark={isDark} toggle={toggle} />
      <Shell>
        <header className="pt-24 pb-14 md:pt-32 md:pb-20">
          <a
            href="/#case-field-report"
            className="inline-flex min-h-[44px] items-center gap-2 text-[14px] text-caption transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft width={16} height={16} strokeWidth={2} aria-hidden="true" />
            Back to the case study
          </a>
          <div className="mt-10">
            <Eyebrow>CASE STUDY 04&nbsp;&nbsp;·&nbsp;&nbsp;EVERY SCREEN</Eyebrow>
            <h1 className="mt-5 font-serif font-semibold text-heading text-[42px] leading-[1.1] sm:text-[50px] md:text-[62px]">
              Field reporting app
            </h1>
          </div>
        </header>
        <main className="flex flex-col gap-20 pb-24 md:pb-32">
          <ScreenGroup title="Foreman · Phone" screens={foremanPhone} cols="grid-cols-2 lg:grid-cols-4" />
          <ScreenGroup title="Foreman · iPad" screens={foremanIpad} cols="grid-cols-1 sm:grid-cols-2" />
          <ScreenGroup title="Office · Desktop" screens={officeDesktop} cols="grid-cols-1 lg:grid-cols-2" />
          <ScreenGroup title="Office · Phone" screens={officePhone} cols="grid-cols-2 lg:grid-cols-4" />
          <p className="border-t border-rule-strong pt-8 text-[13px] leading-[1.65] text-caption">
            Designed in Figma and built with Claude in the desktop app. Client
            work shared without the client's name. The screens use an invented
            company, Ridgeline Interiors, with invented people and jobs.
          </p>
        </main>
      </Shell>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FieldReportPage />
  </React.StrictMode>,
);
