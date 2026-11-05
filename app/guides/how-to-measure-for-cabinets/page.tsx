'use client';

import { useRouter } from 'next/navigation';
import HowToMeasureGuide from '@/components/HowToMeasureGuide';

export default function MeasurePage() {
  const router = useRouter();

  return (
    <HowToMeasureGuide
      onBackToGuides={() => router.push('/guides')}
    />
  );
}
