import type { Metadata } from "next";
import "./globals.css";
import "./lesson.css";
import "./field-guide.css";

export const metadata: Metadata = {
  title: "Gloamforge | A Blender field guide",
  description:
    "Three short Blender missions for learning cinematic fantasy character creation on a MacBook.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Gloamforge",
    description: "Build characters. Light worlds. Tell stories.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gloamforge title beside an original fantasy character blockout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gloamforge",
    description: "Build characters. Light worlds. Tell stories.",
    images: ["/og.png"],
  },
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
