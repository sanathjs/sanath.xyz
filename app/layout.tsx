import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Sanath Kumar J S — Lead Software Engineer",
  description:
    "Lead Software Engineer with 12+ years of .NET full-stack expertise. Specialising in scalable distributed systems, RESTful API architecture, and production-grade AI/RAG pipelines.",
  keywords: [
    "Sanath Kumar",
    "Software Engineer",
    ".NET",
    "Full Stack",
    "AI",
    "RAG",
    "React",
    "Next.js",
    "Bengaluru",
  ],
  authors: [{ name: "Sanath Kumar J S" }],
  openGraph: {
    title: "Sanath Kumar J S — Lead Software Engineer",
    description:
      "12+ years of .NET full-stack expertise. AI/RAG pipelines, scalable systems, and engineering leadership.",
    url: "https://sanath.xyz",
    siteName: "Sanath Kumar J S",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanath Kumar J S — Lead Software Engineer",
    description:
      "12+ years of .NET full-stack expertise. AI/RAG pipelines, scalable systems, and engineering leadership.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sanath Kumar J S",
              jobTitle: "Lead Software Engineer",
              url: "https://sanath.xyz",
              email: "sanathjs@gmail.com",
              sameAs: [
                "https://linkedin.com/in/sanathjs",
                "https://github.com/sanathjs",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Ingenio Inc.",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressCountry: "IN",
              },
              knowsAbout: [
                "C#",
                ".NET",
                "React",
                "Next.js",
                "AI",
                "RAG Pipelines",
                "PostgreSQL",
                "pgvector",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
