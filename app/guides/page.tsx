'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GuidesHub from '@/components/GuidesHub';
import PrintableChecklistModal from '@/components/PrintableChecklistModal';

export default function GuidesPage() {
  const router = useRouter();
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  return (
    <>
      <GuidesHub
        onNavigateToCareGuide={() => {
          router.push('/guides/cabinet-care');
        }}
        onNavigateToMeasureGuide={() => {
          router.push('/guides/how-to-measure-for-cabinets');
        }}
        onSelectGuideSlug={(slug) => {
          router.push(`/guides/${slug}`);
        }}
        onOpenChecklistModal={() => setIsChecklistOpen(true)}
      />
      <PrintableChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </>
  );
}
