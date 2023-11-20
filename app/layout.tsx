import "normalize.css";
import "@/styles/global.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UX Cards",
  description: "A collection of cards about User Experience Design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
