'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, PanelRightOpen } from 'lucide-react';
import Link from 'next/link';
import { useResume } from '@/hooks/useResume';

type EditorHeaderProps = {
  onToggleSidebar: () => void;
};


export default function EditorHeader({ onToggleSidebar }: EditorHeaderProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="flex h-16 items-center border-b bg-background px-4 md:px-6 no-print">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-headline text-lg font-bold text-primary">
          resume.docupilot.co.in
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
         <Button variant="outline" size="icon" className="md:hidden" onClick={onToggleSidebar}>
          <PanelRightOpen className="h-4 w-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
    </header>
  );
}
