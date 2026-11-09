'use client';

import { useRouter } from 'next/navigation';
import AboutUsPage from '@/components/AboutUsPage';

export default function AboutRoutePage() {
  const router = useRouter();

  return (
    <AboutUsPage
      onBackToGuides={() => router.push('/guides')}
      onNavigate={(view) => {
        if (view === 'guides') router.push('/guides');
        else if (view === 'contact') router.push('/contact');
        else if (view === 'warranty') router.push('/warranty');
        else if (view === 'cabinet-care') router.push('/#cabinet-care');
        else if (view === 'how-to-measure-for-cabinets') router.push('/#how-to-measure-for-cabinets');
        else if (view === 'vanity-finder') router.push('/#vanity-finder');
        else router.push(`/#${view}`);
      }}
    />
  );
}
