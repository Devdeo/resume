'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function EditorHeader() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="flex h-16 items-center border-b bg-background px-4 md:px-6 no-print">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-headline text-lg font-bold text-primary">
          ResumeForge AI
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </header>
  );
}
