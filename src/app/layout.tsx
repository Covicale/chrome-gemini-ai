import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Footer from "@/components/footer";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChromeGPT",
  description: "ChatGPT Clone with Chrome Gemini's AI Integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
