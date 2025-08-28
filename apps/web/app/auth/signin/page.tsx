'use client';

import Link from 'next/link';

export default function SignInPage() {
  return (
    <div>
      <Link href={'/api/auth/google'}>Sign In With Google</Link>
    </div>
  );
}
