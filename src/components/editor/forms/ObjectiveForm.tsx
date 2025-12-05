'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { careerObjectives } from '@/lib/data';

export default function ObjectiveForm() {
  const { data, setData } = useResume();
  const section = data.sections.find(s => s.type === 'careerObjective');

  if (!section) return null;

  const careerObjective = section.content as string;

  const handleContentChange = (newContent: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === section.id ? { ...s, content: newContent } : s)
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleContentChange(e.target.value);
  };
  
  const handleSelectChange = (value: string) => {
    if (value !== 'custom') {
      handleContentChange(value);
    }
  };

  return (
    <AccordionItem value="careerObjective">
      <AccordionTrigger>Career Objective</AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="space-y-2">
            <Label>Pre-written Objectives</Label>
            <Select onValueChange={handleSelectChange}>
                <SelectTrigger><SelectValue placeholder="Select an objective..." /></SelectTrigger>
                <SelectContent>
                    {careerObjectives.map((obj, i) => (
                        <SelectItem key={i} value={obj}>{obj.substring(0, 40)}...</SelectItem>
                    ))}
                    <SelectItem value="custom">Write my own</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
          <Label>Custom Objective</Label>
          <Textarea
            value={careerObjective}
            onChange={handleTextChange}
            rows={5}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
