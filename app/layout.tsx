import type { Metadata } from "next";
import { Poppins, Montserrat, Raleway, Oswald, Inter, Open_Sans, Lato, Nunito } from "next/font/google";
import "./globals.css";

const poppins    = Poppins({    subsets: ["latin"], weight: ["400","600","700","800","900"], variable: "--font-poppins",    display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400","500","600","700"],       variable: "--font-montserrat", display: "swap" });
const raleway    = Raleway({    subsets: ["latin"], weight: ["400","600","700","800","900"], variable: "--font-raleway",    display: "swap" });
const oswald     = Oswald({     subsets: ["latin"], weight: ["400","500","600","700"],       variable: "--font-oswald",     display: "swap" });
const inter      = Inter({      subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-inter",      display: "swap" });
const openSans   = Open_Sans({  subsets: ["latin"], weight: ["400","600","700"],             variable: "--font-open-sans",  display: "swap" });
const lato       = Lato({       subsets: ["latin"], weight: ["400","700"],                  variable: "--font-lato",       display: "swap" });
const nunito     = Nunito({     subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-nunito",     display: "swap" });

export const metadata: Metadata = {
  title: "AI Automation with Tito Ry",
  description:
    "Think. Automate. Succeed. Learn AI automation from Tito Ry — no-code workflows, AI agents, and business systems that run themselves.",
  keywords: ["AI automation", "n8n", "Make", "Zapier", "AI agents", "Tito Ry"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    poppins.variable, montserrat.variable, raleway.variable, oswald.variable,
    inter.variable, openSans.variable, lato.variable, nunito.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
