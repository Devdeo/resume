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
      console.error("Resume element not found for download.");
      return;
    }
    setIsDownloading(true);
    
    // Store original transform and apply temporary styles for export
    const originalTransform = resumeElement.style.transform;
    resumeElement.style.transform = 'scale(1)';
    document.body.classList.add('pdf-export');

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        width: resumeElement.offsetWidth,
        height: resumeElement.offsetHeight,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 size in mm: 210 x 297
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore original styles
      resumeElement.style.transform = originalTransform;
      setIsDownloading(false);
      document.body.classList.remove('pdf-export');
    }
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
