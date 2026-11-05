'use client';

import { useParams, useRouter } from 'next/navigation';
import { VANSTRO_GUIDES } from '@/data/all-vanstro-guides';
import UniversalGuideDetail from '@/components/UniversalGuideDetail';
import HowToMeasureGuide from '@/components/HowToMeasureGuide';

export default function GuideDynamicPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const slug = typeof rawSlug === 'string' ? rawSlug : '';

  // If slug is how-to-measure-for-cabinets, we have the dedicated interactive calculator component as well
  if (slug === 'how-to-measure-for-cabinets') {
    return (
      <HowToMeasureGuide
        onBackToGuides={() => router.push('/guides')}
      />
    );
  }

  const guideData = VANSTRO_GUIDES[slug] || VANSTRO_GUIDES['cabinet-care'];

  return (
    <UniversalGuideDetail
      guide={guideData}
      onBackToGuides={() => router.push('/guides')}
    />
  );
}
