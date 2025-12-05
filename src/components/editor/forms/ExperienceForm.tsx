'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { type WorkExperience } from '@/lib/types';

export default function ExperienceForm() {
  const { data, setData } = useResume();
  const experiences = data.workExperience;
  
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
    setData(prev => ({ ...prev, workExperience: updatedExperiences }));
  };

  const addExperience = () => {
    const newExperience: WorkExperience = { id: Date.now().toString(), company: '', role: '', duration: '', responsibilities: '' };
    setData(prev => ({ ...prev, workExperience: [...experiences, newExperience] }));
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, workExperience: updatedExperiences }));
  };

  return (
    <AccordionItem value="workExperience">
      <AccordionTrigger>Work Experience</AccordionTrigger>
      <AccordionContent className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-md space-y-4 relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeExperience(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Company Name</Label><Input name="company" value={exp.company} onChange={(e) => handleChange(index, e)} /></div>
                <div className="space-y-2"><Label>Role / Position</Label><Input name="role" value={exp.role} onChange={(e) => handleChange(index, e)} /></div>
            </div>
            <div className="space-y-2"><Label>Duration (e.g., 2020 - Present)</Label><Input name="duration" value={exp.duration} onChange={(e) => handleChange(index, e)} /></div>
            <div className="space-y-2"><Label>Responsibilities</Label><Textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleChange(index, e)} /></div>
          </div>
        ))}
        <Button variant="outline" onClick={addExperience}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
