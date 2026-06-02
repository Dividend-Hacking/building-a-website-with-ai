import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Building a Website with AI",
  description: "An interactive, scrollable presentation detailing the process of building high-quality websites using artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
