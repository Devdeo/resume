'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import StyleControls from './StyleControls';

export default function EditorSidebar() {
  return (
    <aside className="w-96 border-l bg-background no-print flex flex-col">
        <div className="p-4 border-b">
            <h3 className="text-lg font-semibold font-headline">Style Controls</h3>
        </div>
        <ScrollArea className="flex-1">
        <div className="p-4">
            <StyleControls />
        </div>
        </ScrollArea>
    </aside>
  );
}
