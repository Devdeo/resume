'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import StyleControls from './StyleControls';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { useResume } from '@/hooks/useResume';
import { Button } from '@/components/ui/button';
import { PlusCircle, Palette } from 'lucide-react';
import { type CustomSection, type ResumeSection } from '@/lib/types';

export default function EditorSidebar() {
  const resumeContext = useResume();
  if (!resumeContext) return null; // Or some loading state

  const { setData, activeAccordionItem, setActiveAccordionItem } = resumeContext;
  const [showStyles, setShowStyles] = React.useState(true);

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
    <aside className="w-full h-full md:w-96 border-l bg-background no-print flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold font-headline">Controls</h3>
        <div className='flex gap-2'>
          <Button size="sm" variant="outline" onClick={() => setShowStyles(prev => !prev)}>
            <Palette className="mr-2 h-4 w-4" />
            Styles
          </Button>
          <Button size="sm" variant="outline" onClick={addSection}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        {showStyles && (
            <Accordion
            type="single"
            collapsible
            className="w-full"
            value={activeAccordionItem}
            onValueChange={setActiveAccordionItem}
            >
              <div className="p-4 space-y-2">
                <AccordionItem value="typography">
                  <StyleControls type="typography" />
                </AccordionItem>
                <AccordionItem value="layout">
                  <StyleControls type="layout" />
                </AccordionItem>
              </div>
            </Accordion>
        )}
      </ScrollArea>
    </aside>
  );
}
