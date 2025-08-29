import { Button } from '@studysync/ui/components/button';

import { ArrowUpRight, CirclePlay } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Your Study group <br /> in one place
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Join your study group and collaborate with peers effortlessly.
          <br /> Add notes, share resources, and stay organized.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href="/home">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            disabled
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Hero };
