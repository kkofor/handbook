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
          router.push('/cabinet-care');
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
