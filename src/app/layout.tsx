import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Versus Game Center | Premium E-Spor & Gaming Deneyimi",
  description:
    "Ankara'nın premium gaming deneyimi. E-spor, yarış simülatörü ve VIP odalar.",
  keywords: [
    "Versus",
    "Game Center",
    "E-spor",
    "Gaming",
    "Ankara",
    "Kızılay",
    "Pursaklar",
  ],
  authors: [{ name: "Versus Game Center" }],
  openGraph: {
    title: "Versus Game Center",
    description:
      "Ankara'nın premium gaming deneyimi. E-spor, yarış simülatörü ve VIP odalar.",
    siteName: "Versus Game Center",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundImage: "url('/images/Gemini_Generated_Image_kq6tpnkq6tpnkq6t.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundColor: "#000000",
        }}
      >
        {/* Dark overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[1] pointer-events-none bg-black/35"
        />
        {/* RGB Logo Glow */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-[1] pointer-events-none flex justify-center"
          style={{ height: '45vh' }}
        >
          <div className="rgb-logo-glow" />
        </div>
        <div className="relative z-[2]">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
