'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import StyleControls from './StyleControls';
import { Accordion } from '@/components/ui/accordion';
import { useResume } from '@/hooks/useResume';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { type CustomSection, type ResumeSection } from '@/lib/types';

export default function EditorSidebar() {
  const { data, setData, activeAccordionItem, setActiveAccordionItem } = useResume();

  const addSection = () => {
    const newSection: ResumeSection = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      title: 'New Section',
      deletable: true,
      content: {
        id: `custom-content-${Date.now()}`,
        title: 'New Section',
        content: 'This is your new custom section. Edit the title and content as you see fit.'
      } as CustomSection
    };
    setData(prev => ({...prev, sections: [...prev.sections, newSection]}));
  };

  return (
    <aside className="w-96 border-l bg-background no-print flex-col hidden md:flex">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold font-headline">Style & Content</h3>
        <Button size="sm" variant="outline" onClick={addSection}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={activeAccordionItem}
          onValueChange={setActiveAccordionItem}
        >
          <div className="p-4">
            <StyleControls />
          </div>
        </Accordion>
      </ScrollArea>
    </aside>
  );
}
