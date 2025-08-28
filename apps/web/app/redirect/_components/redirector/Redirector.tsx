'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Redirector({ redirect }: { redirect: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(redirect);
  }, [router, redirect]);

  return <div>Redirecting...</div>;
}
