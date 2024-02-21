import type { Metadata } from "next";
import './globals.css';



export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};


export const metadata: Metadata = {
  title: "FLock Frame testing",
  description: "LFG",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}