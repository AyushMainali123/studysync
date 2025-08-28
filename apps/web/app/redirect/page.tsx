import { Suspense } from 'react';
import Redirector from './_components/redirector';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RedirectPage({ searchParams }: PageProps) {
  const redirectPath = ((await searchParams).redirect as string) || '/';

  return (
    <div>
      <Suspense fallback={<></>}>
        <Redirector redirect={redirectPath} />
      </Suspense>
    </div>
  );
}
