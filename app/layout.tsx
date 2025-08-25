
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Predict & Build Arena",
  description: "Where predictions forge products, powered by community.",
  openGraph: {
    title: "Predict & Build Arena",
    description: "Where predictions forge products, powered by community.",
    images: ["/hero-image.png"],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/hero-image.png",
      button: {
        title: "Launch Predict & Build Arena",
        action: {
          type: "launch_frame",
          name: "Predict & Build Arena",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: "/splash-image.png",
          splashBackgroundColor: "#f1f5f9",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
