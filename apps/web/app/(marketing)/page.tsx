import { Navbar } from '@/app/(marketing)/_components/navbar';
import { Hero } from './_components/hero';

export default async function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
