import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VanStro Cabinet Care Handbook | Luxury Architectural Millwork',
  description:
    'Architectural Digest luxury editorial care handbook and maintenance guide for VanStro custom cabinetry. Material care protocols for veneer, painted, thermofoil, and brass hardware.',
  openGraph: {
    title: 'VanStro Cabinet Care Handbook | Luxury Architectural Millwork',
    description:
      'Architectural Digest luxury editorial care handbook and maintenance guide for VanStro custom cabinetry.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VanStro Cabinet Care Handbook | Luxury Architectural Millwork',
    description:
      'Architectural Digest luxury editorial care handbook and maintenance guide for VanStro custom cabinetry.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-[#F9F8F6] text-[#1C1A17]">
      <body suppressHydrationWarning className="bg-[#F9F8F6] text-[#1C1A17] min-h-screen antialiased selection:bg-[#9B7A4F]/20 selection:text-[#1C1A17]">
        {children}
      </body>
    </html>
  );
}
