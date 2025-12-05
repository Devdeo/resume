'use client';

import React, { useState, useMemo } from 'react';
import { ResumeProvider } from '@/hooks/useResume';
import { type ResumeTemplate, type ResumeData, type ResumeStyle } from '@/lib/types';
import EditorHeader from './EditorHeader';
import EditorSidebar from './EditorSidebar';
import ResumePreview from './ResumePreview';

type EditorLayoutProps = {
  initialTemplate: ResumeTemplate;
};

export default function EditorLayout({ initialTemplate }: EditorLayoutProps) {
  const [data, setData] = useState<ResumeData>(initialTemplate.data);
  const [style, setStyle] = useState<ResumeStyle>(initialTemplate.style);
  const [activeSection, setActiveSection] = useState<string>('personalInfo');
  const [activeAccordionItem, setActiveAccordionItem] = useState<string>('');
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  const contextValue = useMemo(() => ({
    data,
    setData,
    style,
    setStyle,
    activeSection,
    setActiveSection,
    activeAccordionItem,
    setActiveAccordionItem,
  }), [data, style, activeSection, activeAccordionItem]);

  const onDragStart = (id: string) => {
    setDraggingItem(id);
  };

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggingItem === null || draggingItem === id) return;

    const newSections = Array.from(data.sections);
    const sourceIndex = newSections.findIndex(s => s.id === draggingItem);
    const targetIndex = newSections.findIndex(s => s.id === id);

    const [reorderedItem] = newSections.splice(sourceIndex, 1);
    newSections.splice(targetIndex, 0, reorderedItem);

    setData(prev => ({ ...prev, sections: newSections }));
  };

  const onDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <ResumeProvider value={contextValue}>
      <div className="flex h-screen w-full flex-col bg-muted/40">
        <EditorHeader />
        <main className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-0 sm:p-4 md:p-8 print-container">
            <ResumePreview 
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              draggingItem={draggingItem}
            />
          </div>
          <EditorSidebar />
        </main>
      </div>
    </ResumeProvider>
  );
}
