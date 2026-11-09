'use client';

import { useRouter } from 'next/navigation';
import WarrantyPage from '@/components/WarrantyPage';

export default function WarrantyRoutePage() {
  const router = useRouter();

  return (
    <WarrantyPage
      onBackToGuides={() => router.push('/guides')}
      onNavigate={(view) => {
        if (view === 'guides') router.push('/guides');
        else if (view === 'contact') router.push('/contact');
        else if (view === 'cabinet-care') router.push('/#cabinet-care');
        else if (view === 'how-to-measure-for-cabinets') router.push('/#how-to-measure-for-cabinets');
        else if (view === 'vanity-finder') router.push('/#vanity-finder');
        else router.push(`/#${view}`);
      }}
    />
  );
}
