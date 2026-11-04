'use client';

import { useRouter } from 'next/navigation';
import CabinetCareHandbook from '@/components/CabinetCareHandbook';

export default function CabinetCarePage() {
  const router = useRouter();

  return (
    <CabinetCareHandbook
      onBackToGuides={() => {
        router.push('/');
      }}
    />
  );
}
