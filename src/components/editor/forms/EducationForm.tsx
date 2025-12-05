'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { type AcademicQualification } from '@/lib/types';

type EducationFormProps = {
  type: 'academic' | 'professional';
};

export default function EducationForm({ type }: EducationFormProps) {
  const { data, setData } = useResume();
  const title = type === 'academic' ? 'Academic Qualifications' : 'Professional Qualifications';
  const dataKey = type === 'academic' ? 'academicQualifications' : 'professionalQualifications';
  const qualifications = data[dataKey];
  
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = { ...updatedQualifications[index], [name]: value };
    setData(prev => ({ ...prev, [dataKey]: updatedQualifications }));
  };

  const addQualification = () => {
    const newQualification: AcademicQualification = { id: Date.now().toString(), exam: '', board: '', year: '', marks: '', division: '' };
    setData(prev => ({ ...prev, [dataKey]: [...qualifications, newQualification] }));
  };

  const removeQualification = (index: number) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, [dataKey]: updatedQualifications }));
  };

  return (
    <AccordionItem value={dataKey}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="space-y-4">
        {qualifications.map((q, index) => (
          <div key={q.id} className="p-4 border rounded-md space-y-4 relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeQualification(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div className="space-y-2"><Label>Exam / Degree</Label><Input name="exam" value={q.exam} onChange={(e) => handleChange(index, e)} /></div>
            <div className="space-y-2"><Label>Board / University</Label><Input name="board" value={q.board} onChange={(e) => handleChange(index, e)} /></div>
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Passing Year</Label><Input name="year" value={q.year} onChange={(e) => handleChange(index, e)} /></div>
                <div className="space-y-2"><Label>Marks %</Label><Input name="marks" value={q.marks} onChange={(e) => handleChange(index, e)} /></div>
                <div className="space-y-2"><Label>Division</Label><Input name="division" value={q.division} onChange={(e) => handleChange(index, e)} /></div>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addQualification}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Qualification
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
