import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "GENZEST Chocolate | The Origin of Indulgence",
  description: "Experience the ultimate transformation from cacao pod to premium dark chocolate bar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased text-orange-50/70">
        {children}
      </body>
    </html>
  );
}
