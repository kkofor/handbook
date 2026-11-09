import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VanStro Cabinet Care Handbook | VanStro Global Supply',
  description:
    'Official VanStro Care Handbook and guides for Canadian kitchen cabinets and bathroom vanities. Maintenance protocols for laminate, painted, and PVC surfaces.',
  openGraph: {
    title: 'VanStro Cabinet Care Handbook | VanStro Global Supply',
    description:
      'Official VanStro Care Handbook and guides for Canadian kitchen cabinets and bathroom vanities.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VanStro Cabinet Care Handbook | VanStro Global Supply',
    description:
      'Official VanStro Care Handbook and guides for Canadian kitchen cabinets and bathroom vanities.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-white text-[#10201d]">
      <body suppressHydrationWarning className="bg-white text-[#10201d] min-h-screen antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
        {children}
      </body>
    </html>
  );
}
