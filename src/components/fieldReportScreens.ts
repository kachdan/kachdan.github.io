// Screens exported at 2x from the cleaned Figma file. Every name, job and the
// "Ridgeline Interiors" company are invented. No client data appears here.
import phoneStart from "@/assets/field-report/fr-01-phone-start.webp";
import phoneSignIn from "@/assets/field-report/fr-02-phone-sign-in.webp";
import phoneReport from "@/assets/field-report/fr-03-phone-report.webp";
import phonePickJob from "@/assets/field-report/fr-04-phone-pick-job.webp";
import phoneNewJob from "@/assets/field-report/fr-05-phone-new-job.webp";
import phoneReportFilled from "@/assets/field-report/fr-06-phone-report-filled.webp";
import phoneMissing from "@/assets/field-report/fr-07-phone-missing.webp";
import phoneSent from "@/assets/field-report/fr-08-phone-sent.webp";
import ipadStart from "@/assets/field-report/fr-09-ipad-start.webp";
import ipadReport from "@/assets/field-report/fr-10-ipad-report.webp";
import ipadPickJob from "@/assets/field-report/fr-11-ipad-pick-job.webp";
import ipadSent from "@/assets/field-report/fr-12-ipad-sent.webp";
import officeToday from "@/assets/field-report/fr-13-office-today.webp";
import officeReports from "@/assets/field-report/fr-14-office-reports.webp";
import officeDetail from "@/assets/field-report/fr-15-office-detail.webp";
import officeJobs from "@/assets/field-report/fr-16-office-jobs.webp";
import officeAddJob from "@/assets/field-report/fr-17-office-add-job.webp";
import officeForemen from "@/assets/field-report/fr-18-office-foremen.webp";
import officePhoneToday from "@/assets/field-report/fr-19-office-phone-today.webp";
import officePhoneDetail from "@/assets/field-report/fr-20-office-phone-detail.webp";

export type Screen = { src: string; label: string; alt: string; w: number; h: number };

export const foremanPhone: Screen[] = [
  { src: phoneStart, label: "Start", alt: "Foreman start screen with the date and a Start today's report button", w: 390, h: 844 },
  { src: phoneSignIn, label: "Sign in, first time only", alt: "Sign in once with a Microsoft work account", w: 390, h: 844 },
  { src: phoneReport, label: "The report", alt: "Empty end-of-day report with report date, job and work completed", w: 390, h: 844 },
  { src: phonePickJob, label: "Pick a job", alt: "Job picker tray with recent jobs and all jobs A to Z", w: 390, h: 844 },
  { src: phoneNewJob, label: "Request a new job", alt: "Form to request a job that is not on the list", w: 390, h: 844 },
  { src: phoneReportFilled, label: "Filled in", alt: "Completed report with tasks, answers, plan and photos and videos", w: 390, h: 2026 },
  { src: phoneMissing, label: "Something missing", alt: "Report showing 2 missing answers marked in place", w: 390, h: 844 },
  { src: phoneSent, label: "Sent", alt: "Report sent confirmation with a summary of the report", w: 390, h: 844 },
];

export const foremanIpad: Screen[] = [
  { src: ipadStart, label: "Start", alt: "iPad start screen", w: 834, h: 1194 },
  { src: ipadReport, label: "The report, two columns", alt: "iPad report in two columns", w: 834, h: 1425 },
  { src: ipadPickJob, label: "Pick a job", alt: "iPad job picker as a centered sheet", w: 834, h: 1194 },
  { src: ipadSent, label: "Sent", alt: "iPad report sent confirmation", w: 834, h: 1194 },
];

export const officeDesktop: Screen[] = [
  { src: officeToday, label: "Today", alt: "Office dashboard showing reports today, who is missing, materials and safety", w: 1440, h: 960 },
  { src: officeReports, label: "All reports", alt: "All reports with search, filters and quick filters", w: 1440, h: 960 },
  { src: officeDetail, label: "Report detail", alt: "One report with weather, work completed, flags and photos and videos", w: 1440, h: 960 },
  { src: officeJobs, label: "Jobs", alt: "Job list with a new job request to approve or merge", w: 1440, h: 960 },
  { src: officeAddJob, label: "Add a job", alt: "Add a job dialog", w: 1440, h: 960 },
  { src: officeForemen, label: "Foremen", alt: "Weekly grid of who sent a report each workday, with daily reminders", w: 1440, h: 960 },
];

export const officePhone: Screen[] = [
  { src: officePhoneToday, label: "Today", alt: "Office dashboard on a phone", w: 390, h: 844 },
  { src: officePhoneDetail, label: "Report detail", alt: "One report on a phone with a Download PDF button", w: 390, h: 1015 },
];

// The exports have rounded, transparent corners, so the shadow follows the
// image's own shape instead of a square box.
export const screenShadow =
  "[filter:drop-shadow(0_10px_24px_rgba(0,0,0,0.14))] dark:[filter:drop-shadow(0_10px_24px_rgba(0,0,0,0.45))]";
