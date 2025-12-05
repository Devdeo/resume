'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Declaration } from '@/lib/types';

export default function DeclarationForm() {
  const { data, setData } = useResume();
  const section = data.sections.find(s => s.type === 'declaration');

  if (!section) return null;

  const declaration = section.content as Declaration;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newContent = { ...declaration, [name]: value };
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === section.id ? { ...s, content: newContent } : s)
    }));
  };

  return (
    <AccordionItem value="declaration">
      <AccordionTrigger>Declaration</AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="space-y-2">
          <Label>Declaration Text</Label>
          <Textarea name="text" value={declaration.text} onChange={handleChange} rows={4} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Date</Label><Input name="date" type="date" value={declaration.date} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>Place</Label><Input name="place" value={declaration.place} onChange={handleChange} /></div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
