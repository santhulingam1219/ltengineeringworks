import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Manrope, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading-base",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | LT Engineering Works",
    default: "LT Engineering Works — Industrial Project Execution & Skilled Manpower | Paradeep, Odisha",
  },
  description:
    "LT Engineering Works is a leading industrial engineering, structural fabrication, erection, piping, civil, and skilled manpower contracting firm based in Paradeep, Odisha. GSTIN: 21AAFFL7905E1ZO.",
  keywords: [
    "LT Engineering Works",
    "Industrial Project Execution",
    "Skilled Manpower Supply Paradeep",
    "Structural Fabrication Odisha",
    "Piping Works Paradeep",
    "Erection Works",
    "Civil Engineering Contractor",
    "Fitter Fabricator Rigger Jobs Paradeep",
  ],
  authors: [{ name: "LT Engineering Works" }],
  creator: "LT Engineering Works",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ltengineeringworks.com",
    siteName: "LT Engineering Works",
    title: "LT Engineering Works — Industrial Project Execution & Skilled Manpower Solutions",
    description:
      "Executing heavy industrial engineering, structural fabrication, piping, and skilled workforce mobilization across Paradeep and Eastern India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${manrope.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
