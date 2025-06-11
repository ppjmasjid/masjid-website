import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import LayoutWrapper from "@/components/LayoutWrapper"; // ⬅️ Client-side wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purbo Patuar Par Jame Masjid",
  description:
    "Purbo Patuar Par Jame Masjid - Your Community Hub for Islamic Faith and Services",
  icons: {
    icon: "/logo.png",     // located in /public
    apple: "/logo.png",    // optional
    shortcut: "/logo.png", // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
