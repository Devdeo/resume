'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function SkillsForm() {
  const { data, setData } = useResume();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(prev => ({ ...prev, extraQualification: e.target.value }));
  };

  return (
    <AccordionItem value="extraQualification">
      <AccordionTrigger>Extra Qualification / Skills</AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="space-y-2">
          <Label>Skills or Qualifications</Label>
          <Textarea
            value={data.extraQualification}
            onChange={handleChange}
            rows={4}
            placeholder="e.g., Proficient in MERN Stack, Fluent in Spanish, etc."
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
