'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import StyleControls from './StyleControls';
import { Accordion } from '@/components/ui/accordion';
import { useResume } from '@/hooks/useResume';

export default function EditorSidebar() {
  const { activeAccordionItem, setActiveAccordionItem } = useResume();

  return (
    <aside className="w-96 border-l bg-background no-print flex-col hidden md:flex">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold font-headline">Style & Content</h3>
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
