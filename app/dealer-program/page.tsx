'use client';

import { useRouter } from 'next/navigation';
import DealerProgramPage from '@/components/DealerProgramPage';

export default function DealerProgramRoutePage() {
  const router = useRouter();

  return (
    <DealerProgramPage
      onBackToGuides={() => router.push('/guides')}
      onNavigate={(view) => {
        if (view === 'guides') router.push('/guides');
        else if (view === 'contact') router.push('/contact');
        else if (view === 'warranty') router.push('/warranty');
        else if (view === 'about') router.push('/about');
        else if (view === 'dealer-program') router.push('/dealer-program');
        else if (view === 'dealers-map' || view === 'dealers/map') router.push('/dealers/map');
        else if (view === 'careers') router.push('/careers');
        else if (view === 'cabinet-care') router.push('/#cabinet-care');
        else if (view === 'how-to-measure-for-cabinets') router.push('/#how-to-measure-for-cabinets');
        else if (view === 'vanity-finder') router.push('/#vanity-finder');
        else router.push(`/#${view}`);
      }}
    />
  );
}
