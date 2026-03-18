import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Burnout Risk Score — ¿Te está quemando la IA?",
  description: "Descubre tu nivel de riesgo de burnout por el caos de la IA. 8 preguntas. 2 minutos. Resultado instantáneo.",
  openGraph: {
    title: "AI Burnout Risk Score — ¿Te está quemando la IA?",
    description: "Descubre tu nivel de riesgo de burnout por el ritmo imparable de la IA. +1200 profesionales ya lo han calculado.",
    url: "https://ai-burnout-risk-score.vercel.app",
    siteName: "AI Burnout Risk Score",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Burnout Risk Score — ¿Te está quemando la IA?",
    description: "8 preguntas para saber si el ritmo de la IA te está destruyendo. Resultado en 2 min.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
