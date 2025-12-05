'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { type AcademicQualification, type WorkExperience } from '@/lib/types';

const Section = ({ title, children, accentColor }: { title: string; children: React.ReactNode, accentColor: string }) => (
  <div className="mb-4">
    <h2 className="font-headline text-lg font-bold uppercase tracking-wider border-b-2" style={{ borderColor: accentColor }}>
      {title}
    </h2>
    <div className="mt-2">{children}</div>
  </div>
);

export default function ResumePreview() {
  const { data, setData, style, setActiveSection } = useResume();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(prev => ({ ...prev, careerObjective: e.target.value }));
  };

  const handleQualificationChange = (type: 'academic' | 'professional', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = type === 'academic' ? 'academicQualifications' : 'professionalQualifications';
    const updated = [...data[key]];
    updated[index] = { ...updated[index], [name]: value };
    setData(prev => ({ ...prev, [key]: updated }));
  };
  
  const addQualification = (type: 'academic' | 'professional') => {
    const key = type === 'academic' ? 'academicQualifications' : 'professionalQualifications';
    const newQualification: AcademicQualification = { id: Date.now().toString(), exam: '', board: '', year: '', marks: '', division: '' };
    setData(prev => ({ ...prev, [key]: [...prev[key], newQualification] }));
  };
  
  const removeQualification = (type: 'academic' | 'professional', index: number) => {
    const key = type === 'academic' ? 'academicQualifications' : 'professionalQualifications';
    const updated = data[key].filter((_, i) => i !== index);
    setData(prev => ({ ...prev, [key]: updated }));
  };
  
  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = [...data.workExperience];
    updated[index] = { ...updated[index], [name]: value };
    setData(prev => ({ ...prev, workExperience: updated }));
  };
  
  const addExperience = () => {
    const newExperience: WorkExperience = { id: Date.now().toString(), company: '', role: '', duration: '', responsibilities: '' };
    setData(prev => ({ ...prev, workExperience: [...data.workExperience, newExperience] }));
  };
  
  const removeExperience = (index: number) => {
    const updated = data.workExperience.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, workExperience: updated }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(prev => ({ ...prev, extraQualification: e.target.value }));
  };

  const handleDeclarationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, declaration: { ...prev.declaration, [name]: value } }));
  };

  const handleFocus = (sectionId: string) => () => setActiveSection(sectionId);

  const pageStyle: React.CSSProperties = {
    fontFamily: `'${style.fontFamily}', sans-serif`,
    fontSize: `${style.fontSize}pt`,
    '--accent-color': style.accentColor,
    padding: `${style.pageMargins}mm`,
    color: '#333'
  } as React.CSSProperties;

  return (
    <div className="mx-auto my-8">
      <div
        id="resume-page"
        className="a4-page aspect-[210/297] w-[210mm] h-[297mm] bg-white shadow-lg origin-top scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-[1] transition-transform duration-300"
        style={pageStyle}
        onClick={handleFocus('page')}
      >
        <div className="p-8 h-full space-y-2">
          <header className="text-center mb-4" onFocus={handleFocus('personalInfo')} tabIndex={0}>
            {data.personalInfo.profilePicture && (
                <div className="mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden border-4" style={{ borderColor: style.accentColor }}>
                    <Image src={data.personalInfo.profilePicture} alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
                </div>
            )}
            <Input name="name" value={data.personalInfo.name} onChange={handlePersonalInfoChange} placeholder="Your Name" className="font-headline text-4xl font-bold text-center border-none shadow-none focus-visible:ring-0 h-auto p-0" />
            <div className="text-sm flex justify-center items-center gap-x-1">
              <Input name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} placeholder="Address" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />, 
              <Input name="zipCode" value={data.personalInfo.zipCode} onChange={handlePersonalInfoChange} placeholder="ZIP" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center w-16" /> |
              <Input name="mobile" value={data.personalInfo.mobile} onChange={handlePersonalInfoChange} placeholder="Mobile" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" /> |
              <Input name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="Email" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />
            </div>
          </header>
          
          <Separator className="my-2" style={{ backgroundColor: style.accentColor, height: '2px' }}/>

          <div onFocus={handleFocus('careerObjective')} tabIndex={0}>
            <Section title="Career Objective" accentColor={style.accentColor}>
              <Textarea value={data.careerObjective} onChange={handleObjectiveChange} className="border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
            </Section>
          </div>

          <div onFocus={handleFocus('academicQualifications')} tabIndex={0}>
            <Section title="Academic Qualifications" accentColor={style.accentColor}>
              <div className="space-y-2">
                {data.academicQualifications.map((q, index) => (
                  <div key={q.id} className="flex gap-2 items-center group">
                    <Input name="exam" value={q.exam} onChange={(e) => handleQualificationChange('academic', index, e)} placeholder="Exam/Degree" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                    <Input name="board" value={q.board} onChange={(e) => handleQualificationChange('academic', index, e)} placeholder="Board/University" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                    <Input name="year" value={q.year} onChange={(e) => handleQualificationChange('academic', index, e)} placeholder="Year" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                    <Input name="marks" value={q.marks} onChange={(e) => handleQualificationChange('academic', index, e)} placeholder="Marks %" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                    <Input name="division" value={q.division} onChange={(e) => handleQualificationChange('academic', index, e)} placeholder="Division" className="border-none shadow-none focus-visible:ring-0 p-0 w-20" />
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeQualification('academic', index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => addQualification('academic')} className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
            </Section>
          </div>
          
          <div onFocus={handleFocus('professionalQualifications')} tabIndex={0}>
            <Section title="Professional Qualifications" accentColor={style.accentColor}>
              <div className="space-y-2">
                {data.professionalQualifications.map((q, index) => (
                   <div key={q.id} className="flex gap-2 items-center group">
                    <Input name="exam" value={q.exam} onChange={(e) => handleQualificationChange('professional', index, e)} placeholder="Exam/Degree" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                    <Input name="board" value={q.board} onChange={(e) => handleQualificationChange('professional', index, e)} placeholder="Board/University" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                    <Input name="year" value={q.year} onChange={(e) => handleQualificationChange('professional', index, e)} placeholder="Year" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                    <Input name="marks" value={q.marks} onChange={(e) => handleQualificationChange('professional', index, e)} placeholder="Marks %" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                    <Input name="division" value={q.division} onChange={(e) => handleQualificationChange('professional', index, e)} placeholder="Division" className="border-none shadow-none focus-visible:ring-0 p-0 w-20" />
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeQualification('professional', index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => addQualification('professional')} className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
            </Section>
          </div>

          <div onFocus={handleFocus('extraQualification')} tabIndex={0}>
            <Section title="Extra Qualification" accentColor={style.accentColor}>
              <Textarea value={data.extraQualification} onChange={handleSkillsChange} className="border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
            </Section>
          </div>
          
          <div onFocus={handleFocus('workExperience')} tabIndex={0}>
            <Section title="Work Experience" accentColor={style.accentColor}>
              <div className="space-y-2">
                {data.workExperience.map((exp, index) => (
                  <div key={exp.id} className="group">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1 items-center">
                            <Input name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} placeholder="Role" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                            -
                            <Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="Company" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                        </div>
                        <Input name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} placeholder="Duration" className="text-xs font-semibold border-none shadow-none focus-visible:ring-0 p-0 text-right" style={{ color: style.accentColor }} />
                    </div>
                    <Textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, e)} placeholder="Responsibilities" className="text-sm border-none shadow-none focus-visible:ring-0 p-0" rows={2} />
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </div>
               <Button variant="outline" size="sm" onClick={addExperience} className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
            </Section>
          </div>

          <div className="absolute bottom-8 left-8 right-8" onFocus={handleFocus('declaration')} tabIndex={0}>
            <Section title="Declaration" accentColor={style.accentColor}>
                <Textarea name="text" value={data.declaration.text} onChange={handleDeclarationChange} className="italic border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
                <div className="flex justify-between mt-4">
                    <div className="flex gap-1 items-center">Date: <Input name="date" type="date" value={data.declaration.date} onChange={handleDeclarationChange} className="border-none shadow-none focus-visible:ring-0 p-0" /></div>
                    <div className="flex gap-1 items-center">Place: <Input name="place" value={data.declaration.place} onChange={handleDeclarationChange} className="border-none shadow-none focus-visible:ring-0 p-0" /></div>
                </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
