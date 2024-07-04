import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>ChromeGPT</title>
        <meta
          name="description"
          content="ChatGPT Clone with Chrome Gemini's AI Integration"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
