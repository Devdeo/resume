
'use client';

import React, { useState, useMemo, useRef } from 'react';
import { ResumeProvider } from '@/hooks/useResume';
import { type ResumeTemplate, type ResumeData, type ResumeStyle } from '@/lib/types';
import EditorHeader from './EditorHeader';
import ResumePreview from './ResumePreview';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

const EditorSidebar = dynamic(() => import('./EditorSidebar'), { ssr: false });


type EditorLayoutProps = {
  initialTemplate: ResumeTemplate;
};

export default function EditorLayout({ initialTemplate }: EditorLayoutProps) {
  const [data, setData] = useState<ResumeData>(initialTemplate.data);
  const [style, setStyle] = useState<ResumeStyle>(initialTemplate.style);
  const [activeSection, setActiveSection] = useState<string>('personalInfo');
  const [activeAccordionItem, setActiveAccordionItem] = useState<string>('');
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const printContainerRef = useRef<HTMLDivElement>(null);

  const initialData = useMemo(() => JSON.parse(JSON.stringify(initialTemplate.data)), [initialTemplate.data]);

  const onDragStart = (id: string) => {
    setDraggingItem(id);
  };

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggingItem === null || draggingItem === id) return;

    const newSections = Array.from(data.sections);
    const sourceIndex = newSections.findIndex(s => s.id === draggingItem);
    const targetIndex = newSections.findIndex(s => s.id === id);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const [reorderedItem] = newSections.splice(sourceIndex, 1);
    newSections.splice(targetIndex, 0, reorderedItem);

    setData(prev => ({ ...prev, sections: newSections }));
  };

  const onDragEnd = () => {
    setDraggingItem(null);
  };
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const contextValue = useMemo(() => ({
    initialData,
    data,
    setData,
    style,
    setStyle,
    activeSection,
    setActiveSection,
    activeAccordionItem,
    setActiveAccordionItem,
    draggingItem,
    onDragStart,
    onDragOver,
    onDragEnd,
  }), [initialData, data, style, activeSection, activeAccordionItem, draggingItem]);


  return (
    <ResumeProvider value={contextValue}>
      <div className="flex h-screen w-full flex-col bg-muted/40 no-print">
        <EditorHeader onToggleSidebar={toggleSidebar} />
        <main className="flex flex-1 overflow-hidden editor-main">
          <div ref={printContainerRef} className="flex-1 overflow-y-auto bg-muted/40">
            <ResumePreview />
          </div>
          <div className='hidden md:block no-print'>
            <EditorSidebar />
          </div>
          <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent className="w-full max-w-sm p-0 md:hidden flex flex-col no-print">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className='font-headline'>Controls</SheetTitle>
                 <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </SheetHeader>
              <EditorSidebar />
            </SheetContent>
          </Sheet>
        </main>
      </div>
      <div className="print-container" style={{ display: 'none' }}>
        <ResumePreview isPreview={true} data={data} style={style} initialData={initialData} />
      </div>
    </ResumeProvider>
  );
}
