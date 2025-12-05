'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  type AcademicQualification,
  type WorkExperience,
  type PersonalInfo,
  type Declaration,
  type ResumeSection,
  type SectionContent,
  type CustomSection
} from '@/lib/types';

const Section = ({ title, children, accentColor, onTitleChange, deletable, onDelete }: { title: string; children: React.ReactNode; accentColor: string; onTitleChange: (newTitle: string) => void; deletable?: boolean; onDelete?: () => void; }) => (
  <div className="mb-4 group relative">
    <div className='flex items-center border-b-2' style={{ borderColor: accentColor }}>
      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="font-headline text-lg font-bold uppercase tracking-wider border-none shadow-none focus-visible:ring-0 p-0 h-auto"
      />
      {deletable && (
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute -right-8 top-0" onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      )}
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

export default function ResumePreview() {
  const { data, setData, style, setActiveSection, setActiveAccordionItem } = useResume();

  const handleSectionContentChange = (sectionId: string, newContent: SectionContent) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, content: newContent } : s)
    }));
  };

  const handleSectionTitleChange = (sectionId: string, newTitle: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, title: newTitle } : s)
    }));
  };
  
  const deleteSection = (sectionId: string) => {
    setData(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== sectionId)}));
  };

  const handleFocus = (sectionId: string) => () => {
    setActiveSection(sectionId);
    setActiveAccordionItem('typography');
  };

  const pageStyle: React.CSSProperties = {
    fontFamily: `'${style.fontFamily}', sans-serif`,
    fontSize: `${style.fontSize}pt`,
    '--accent-color': style.accentColor,
    color: '#333'
  } as React.CSSProperties;

  const renderSection = (section: ResumeSection) => {
    const onTitleChange = (newTitle: string) => handleSectionTitleChange(section.id, newTitle);
    const onDelete = () => deleteSection(section.id);

    const commonSectionProps = {
      title: section.title,
      accentColor: style.accentColor,
      onTitleChange,
      deletable: section.deletable,
      onDelete,
    };
    
    switch (section.type) {
      case 'personalInfo':
        const personalInfo = section.content as PersonalInfo;
        const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            handleSectionContentChange(section.id, { ...personalInfo, [name]: value });
        };
        return (
          <header key={section.id} className="text-center mb-4" onFocus={handleFocus(section.id)} tabIndex={0}>
            {personalInfo.profilePicture && (
              <div className="mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden border-4" style={{ borderColor: style.accentColor }}>
                <Image src={personalInfo.profilePicture} alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
              </div>
            )}
            <Input name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} placeholder="Your Name" className="font-headline text-4xl font-bold text-center border-none shadow-none focus-visible:ring-0 h-auto p-0" />
            <div className="text-sm flex justify-center items-center gap-x-1 flex-wrap">
              <Input name="address" value={personalInfo.address} onChange={handlePersonalInfoChange} placeholder="Address" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />
              <Input name="zipCode" value={personalInfo.zipCode} onChange={handlePersonalInfoChange} placeholder="ZIP" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center w-16" />
              <Input name="mobile" value={personalInfo.mobile} onChange={handlePersonalInfoChange} placeholder="Mobile" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />
              <Input name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} placeholder="Email" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />
            </div>
            <Separator className="my-2" style={{ backgroundColor: style.accentColor, height: '2px' }} />
          </header>
        );
      
      case 'careerObjective':
        const careerObjective = section.content as string;
        return (
          <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
              <Textarea value={careerObjective} onChange={e => handleSectionContentChange(section.id, e.target.value)} className="border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
            </Section>
          </div>
        );

      case 'academicQualifications':
      case 'professionalQualifications':
        const qualifications = section.content as AcademicQualification[];
        const handleQualificationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const updated = [...qualifications];
            updated[index] = { ...updated[index], [name]: value };
            handleSectionContentChange(section.id, updated);
        };
        const addQualification = () => {
            const newQualification: AcademicQualification = { id: Date.now().toString(), exam: '', board: '', year: '', marks: '', division: '' };
            handleSectionContentChange(section.id, [...qualifications, newQualification]);
        };
        const removeQualification = (index: number) => {
            const updated = qualifications.filter((_, i) => i !== index);
            handleSectionContentChange(section.id, updated);
        };
        return (
          <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
              <div className="space-y-2">
                {qualifications.map((q, index) => (
                  <div key={q.id} className="flex gap-2 items-center group">
                    <Input name="exam" value={q.exam} onChange={(e) => handleQualificationChange(index, e)} placeholder="Exam/Degree" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                    <Input name="board" value={q.board} onChange={(e) => handleQualificationChange(index, e)} placeholder="Board/University" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                    <Input name="year" value={q.year} onChange={(e) => handleQualificationChange(index, e)} placeholder="Year" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                    <Input name="marks" value={q.marks} onChange={(e) => handleQualificationChange(index, e)} placeholder="Marks %" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                    <Input name="division" value={q.division} onChange={(e) => handleQualificationChange(index, e)} placeholder="Division" className="border-none shadow-none focus-visible:ring-0 p-0 w-20" />
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeQualification(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addQualification} className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
            </Section>
          </div>
        );
      
      case 'extraQualification':
        const extraQualification = section.content as string;
        return (
          <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
              <Textarea value={extraQualification} onChange={e => handleSectionContentChange(section.id, e.target.value)} className="border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
            </Section>
          </div>
        );

      case 'workExperience':
        const workExperience = section.content as WorkExperience[];
        const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            const updated = [...workExperience];
            updated[index] = { ...updated[index], [name]: value };
            handleSectionContentChange(section.id, updated);
        };
        const addExperience = () => {
            const newExperience: WorkExperience = { id: Date.now().toString(), company: '', role: '', duration: '', responsibilities: '' };
            handleSectionContentChange(section.id, [...workExperience, newExperience]);
        };
        const removeExperience = (index: number) => {
            const updated = workExperience.filter((_, i) => i !== index);
            handleSectionContentChange(section.id, updated);
        };
        return (
            <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
                <Section {...commonSectionProps}>
                <div className="space-y-2">
                    {workExperience.map((exp, index) => (
                    <div key={exp.id} className="group flex flex-col">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1 items-center">
                                <Input name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} placeholder="Role" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                                <span>-</span>
                                <Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="Company" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                            </div>
                            <Input name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} placeholder="Duration" className="text-xs font-semibold border-none shadow-none focus-visible:ring-0 p-0 text-right" style={{ color: style.accentColor }} />
                        </div>
                        <div className="flex items-start">
                        <Textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, e)} placeholder="Responsibilities" className="text-sm border-none shadow-none focus-visible:ring-0 p-0 flex-1" rows={2} />
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    </div>
                    ))}
                </div>
                <Button variant="outline" size="sm" onClick={addExperience} className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
                </Section>
            </div>
        );

      case 'declaration':
        const declaration = section.content as Declaration;
        const handleDeclarationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            handleSectionContentChange(section.id, { ...declaration, [name]: value });
        };
        return (
          <div key={section.id} className="pt-10" onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
                <Textarea name="text" value={declaration.text} onChange={handleDeclarationChange} className="italic border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
                <div className="flex justify-between mt-4">
                    <div className="flex gap-1 items-center">Date: <Input name="date" type="date" value={declaration.date} onChange={handleDeclarationChange} className="border-none shadow-none focus-visible:ring-0 p-0" /></div>
                    <div className="flex gap-1 items-center">Place: <Input name="place" value={declaration.place} onChange={handleDeclarationChange} className="border-none shadow-none focus-visible:ring-0 p-0" /></div>
                </div>
            </Section>
          </div>
        );

      case 'custom':
        const customSection = section.content as CustomSection;
        const handleCustomSectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = e.target;
            handleSectionContentChange(section.id, { ...customSection, content: value });
        };
        const customSectionTitleChange = (newTitle: string) => {
          handleSectionTitleChange(section.id, newTitle);
          handleSectionContentChange(section.id, { ...customSection, title: newTitle });
        };
        return (
            <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
                 <Section 
                    title={customSection.title}
                    accentColor={style.accentColor}
                    onTitleChange={customSectionTitleChange}
                    deletable={section.deletable}
                    onDelete={onDelete}
                 >
                    <Textarea value={customSection.content} onChange={handleCustomSectionChange} className="border-none shadow-none focus-visible:ring-0 p-0" rows={3}/>
                </Section>
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto my-0 sm:my-8">
      <div
        id="resume-page"
        className="a4-page w-full sm:w-[210mm] sm:h-[297mm] bg-white sm:shadow-lg origin-top scale-100 sm:scale-[0.8] md:scale-[0.9] lg:scale-[0.7] xl:scale-[1] transition-transform duration-300"
        style={pageStyle}
        onClick={() => setActiveAccordionItem('layout')}
      >
        <div className="p-4 sm:p-8 h-full" style={{padding: `${style.pageMargins}mm`, columnGap: `${style.sectionSpacing}px`}}>
          {data.sections.map(section => renderSection(section))}
        </div>
      </div>
    </div>
  );
}
