'use client';

import { Editor } from '@/components/editor';

export default function SingleItemPage() {
  return (
    <div className="max-w-7xl w-[95vw] mx-auto p-4 ">
      <Editor onChange={(state) => console.log(state)} />
    </div>
  );
}
