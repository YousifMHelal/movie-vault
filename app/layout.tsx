import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Vault",
  description: "Your favorite movies, all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <main className="max-w-7xl mx-auto bg-black">
          <Navbar />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
