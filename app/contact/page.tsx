'use client';

import { useRouter } from 'next/navigation';
import ContactUsPage from '@/components/ContactUsPage';

export default function ContactRoutePage() {
  const router = useRouter();

  return (
    <ContactUsPage
      onBackToGuides={() => router.push('/guides')}
    />
  );
}
