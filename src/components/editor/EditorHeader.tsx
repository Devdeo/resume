'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, PanelRightOpen, Loader } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type EditorHeaderProps = {
  onToggleSidebar: () => void;
};


export default function EditorHeader({ onToggleSidebar }: EditorHeaderProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const handleDownload = async () => {
    const resumeElement = document.getElementById('resume-page');
    if (!resumeElement) {
      return;
    }
    setIsDownloading(true);

    const canvas = await html2canvas(resumeElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
    setIsDownloading(false);
  };

  return (
    <header className="flex h-16 items-center border-b bg-background px-4 md:px-6 no-print">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-headline text-lg font-bold text-primary">
          docupilot
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
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
