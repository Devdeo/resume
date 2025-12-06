'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, ImagePlus, GripVertical } from 'lucide-react';
import {
  type AcademicQualification,
  type WorkExperience,
  type PersonalInfo,
  type Declaration,
  type ResumeSection,
  type SectionContent,
  type CustomSection,
  type ResumeData,
  type ResumeStyle
} from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import SignaturePad from './SignaturePad';


type ResumePreviewProps = {
  data?: ResumeData;
  style?: ResumeStyle;
  initialData?: ResumeData;
};


const Section = ({ title, children, accentColor, onTitleChange, deletable, onDelete, onDragStart, onDragOver, onDragEnd, draggable, isDragging }: { title: string; children: React.ReactNode; accentColor: string; onTitleChange: (newTitle: string) => void; deletable?: boolean; onDelete?: () => void; onDragStart: () => void; onDragOver: (e: React.DragEvent) => void; onDragEnd: () => void; draggable?: boolean; isDragging: boolean; }) => (
  <div 
    className={`mb-4 group relative ${isDragging ? 'opacity-50' : ''}`}
    draggable={draggable}
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDragEnd={onDragEnd}
    onDrop={onDragEnd}
  >
    <div className='flex items-center border-b-2' style={{ borderColor: accentColor }}>
      {draggable && (
         <div draggable onDragStart={onDragStart} className="cursor-grab opacity-0 group-hover:opacity-100 pr-2">
           <GripVertical className="h-5 w-5 text-muted-foreground" />
         </div>
       )}
      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="font-headline text-lg font-bold uppercase tracking-wider border-none shadow-none focus-visible:ring-0 p-0 h-auto"
        style={{ paddingLeft: deletable ? 0 : '0.5rem' }}
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

export default function ResumePreview(props: ResumePreviewProps) {
  const resumeContext = useResume();
  
  const isEditor = !!resumeContext;
  
  const data = isEditor ? resumeContext.data : props.data!;
  const style = isEditor ? resumeContext.style : props.style!;
  const initialData = isEditor ? resumeContext.initialData : props.initialData!;
  const setData = isEditor ? resumeContext.setData : () => {};
  const setActiveSection = isEditor ? resumeContext.setActiveSection : () => {};
  const setActiveAccordionItem = isEditor ? resumeContext.setActiveAccordionItem : () => {};
  const draggingItem = isEditor ? resumeContext.draggingItem : null;
  const onDragStart = isEditor ? resumeContext.onDragStart : () => {};
  const onDragOver = isEditor ? resumeContext.onDragOver : () => {};
  const onDragEnd = isEditor ? resumeContext.onDragEnd : () => {};


  const imageInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleClearOnFocus = (currentValue: string, initialValue: string, updater: () => void) => {
    if (isEditor && currentValue === initialValue) {
      updater();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const personalInfoSection = data.sections.find(s => s.type === 'personalInfo');
    if (!personalInfoSection) return;

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
          const newContent = { ...(personalInfoSection.content as PersonalInfo), profilePicture: event.target.result as string };
          handleSectionContentChange('personalInfo', newContent);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const pageStyle: React.CSSProperties = {
    fontFamily: `'${style.fontFamily}', sans-serif`,
    fontSize: `${style.fontSize}pt`,
    '--accent-color': style.accentColor,
    color: '#333'
  } as React.CSSProperties;

  const renderSection = (section: ResumeSection, index: number) => {
    const onTitleChange = (newTitle: string) => handleSectionTitleChange(section.id, newTitle);
    const onDelete = () => deleteSection(section.id);

    const isDraggable = section.type !== 'personalInfo';
    
    switch (section.type) {
      case 'personalInfo':
        const personalInfo = section.content as PersonalInfo;
        const initialPersonalInfo = initialData.sections.find(s => s.type === 'personalInfo')?.content as PersonalInfo;
        
        const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            handleSectionContentChange(section.id, { ...personalInfo, [name]: value });
        };
        const defaultProfilePic = PlaceHolderImages.find(img => img.id === 'profile-pic-default')?.imageUrl || '';

        return (
          <header key={section.id} className="text-center mb-4 relative group" onFocus={handleFocus(section.id)} tabIndex={0} onDragOver={(e) => onDragOver?.(e, section.id)}>
             {isEditor && onDragStart && (
                <div draggable onDragStart={() => onDragStart(section.id)} className="cursor-grab opacity-0 group-hover:opacity-100 absolute left-2 top-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
             )}
            <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <div className="mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden border-4 flex items-center justify-center" style={{ borderColor: style.accentColor }}>
                {personalInfo.profilePicture && personalInfo.profilePicture !== defaultProfilePic ? (
                  <Image src={personalInfo.profilePicture} alt="Profile" width={128} height={128} className="object-cover w-full h-full cursor-pointer" onClick={() => imageInputRef.current?.click()} />
                ) : (
                  <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground cursor-pointer" onClick={() => imageInputRef.current?.click()}>
                    <ImagePlus className="w-10 h-10" />
                    <span className="text-xs mt-1">Add Photo</span>
                  </div>
                )}
            </div>
            <Input name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(personalInfo.name, initialPersonalInfo.name, () => handleSectionContentChange(section.id, { ...personalInfo, name: '' }))} placeholder="Your Name" className="font-headline text-4xl font-bold text-center border-none shadow-none focus-visible:ring-0 h-auto p-0" />
            <div className="text-sm flex justify-center items-center gap-x-1 flex-wrap">
              <Input name="address" value={personalInfo.address} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(personalInfo.address, initialPersonalInfo.address, () => handleSectionContentChange(section.id, { ...personalInfo, address: '' }))} placeholder="Address" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />
              <Input name="zipCode" value={personalInfo.zipCode} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(personalInfo.zipCode, initialPersonalInfo.zipCode, () => handleSectionContentChange(section.id, { ...personalInfo, zipCode: '' }))} placeholder="ZIP" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center w-16" />
              <Input name="mobile" value={personalInfo.mobile} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(personalInfo.mobile, initialPersonalInfo.mobile, () => handleSectionContentChange(section.id, { ...personalInfo, mobile: '' }))} placeholder="Mobile" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />
              <Input name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(personalInfo.email, initialPersonalInfo.email, () => handleSectionContentChange(section.id, { ...personalInfo, email: '' }))} placeholder="Email" className="border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center" />
            </div>
            <Separator className="my-2" style={{ backgroundColor: style.accentColor, height: '2px' }} />
          </header>
        );
      
      case 'careerObjective':
      case 'extraQualification':
      case 'declaration':
      case 'academicQualifications':
      case 'professionalQualifications':
      case 'workExperience':
      case 'custom':
        return renderEditableSection(section);
      default:
        return null;
    }
  };

  const renderEditableSection = (section: ResumeSection) => {
    const onTitleChange = (newTitle: string) => handleSectionTitleChange(section.id, newTitle);
    const onDelete = () => deleteSection(section.id);
    const initialSection = initialData.sections.find(s => s.id === section.id);

    const isDraggable = section.type !== 'personalInfo';

    const commonSectionProps = {
      title: section.title,
      accentColor: style.accentColor,
      onTitleChange,
      deletable: isEditor && section.deletable,
      onDelete,
      draggable: isEditor && isDraggable,
      onDragStart: () => onDragStart?.(section.id),
      onDragOver: (e: React.DragEvent) => onDragOver?.(e, section.id),
      onDragEnd: () => onDragEnd?.(),
      isDragging: draggingItem === section.id
    };

    switch (section.type) {
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
        const initialQualifications = initialSection?.content as AcademicQualification[] || [];
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
                {qualifications.map((q, index) => {
                  const initialQ = initialQualifications.find(iq => iq.id === q.id) || { exam: '', board: '', year: '', marks: '', division: '' };
                  const createUpdater = (fieldName: keyof AcademicQualification) => () => {
                    const updated = [...qualifications];
                    updated[index] = { ...updated[index], [fieldName]: '' };
                    handleSectionContentChange(section.id, updated);
                  }
                  
                  return (
                    <div key={q.id} className="flex gap-2 items-center group">
                      <Input name="exam" value={q.exam} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(q.exam, initialQ.exam, createUpdater('exam'))} placeholder="Exam/Degree" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                      <Input name="board" value={q.board} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(q.board, initialQ.board, createUpdater('board'))} placeholder="Board/University" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                      <Input name="year" value={q.year} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(q.year, initialQ.year, createUpdater('year'))} placeholder="Year" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                      <Input name="marks" value={q.marks} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(q.marks, initialQ.marks, createUpdater('marks'))} placeholder="Marks %" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                      <Input name="division" value={q.division} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(q.division, initialQ.division, createUpdater('division'))} placeholder="Division" className="border-none shadow-none focus-visible:ring-0 p-0 w-20" />
                      {isEditor && <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeQualification(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                    </div>
                  )
                })}
              </div>
              {isEditor && <Button variant="outline" size="sm" onClick={addQualification} className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>}
            </Section>
          </div>
        );
      
      case 'extraQualification':
        const extraQualification = section.content as string;
        return (
          <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
              <Textarea value={extraQualification} onChange={e => handleSectionContentChange(section.id, e.target.value)} onFocus={() => handleClearOnFocus(extraQualification, initialSection?.content as string, () => handleSectionContentChange(section.id, ''))} className="border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
            </Section>
          </div>
        );

      case 'workExperience':
        const workExperience = section.content as WorkExperience[];
        const initialWorkExperience = initialSection?.content as WorkExperience[] || [];

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
                    {workExperience.map((exp, index) => {
                      const initialExp = initialWorkExperience.find(iwe => iwe.id === exp.id) || { role: '', company: '', duration: '', responsibilities: ''};
                      const createUpdater = (fieldName: keyof WorkExperience) => () => {
                        const updated = [...workExperience];
                        updated[index] = { ...updated[index], [fieldName]: '' };
                        handleSectionContentChange(section.id, updated);
                      };
                      return (
                        <div key={exp.id} className="group flex flex-col">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1 items-center">
                                    <Input name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(exp.role, initialExp.role, createUpdater('role'))} placeholder="Role" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                                    <span>-</span>
                                    <Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(exp.company, initialExp.company, createUpdater('company'))} placeholder="Company" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                                </div>
                                <Input name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(exp.duration, initialExp.duration, createUpdater('duration'))} placeholder="Duration" className="text-xs font-semibold border-none shadow-none focus-visible:ring-0 p-0 text-right" style={{ color: style.accentColor }} />
                            </div>
                            <div className="flex items-start">
                            <Textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(exp.responsibilities, initialExp.responsibilities, createUpdater('responsibilities'))} placeholder="Responsibilities" className="text-sm border-none shadow-none focus-visible:ring-0 p-0 flex-1" rows={2} />
                            {isEditor && <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                            </div>
                        </div>
                      )
                    })}
                </div>
                {isEditor && <Button variant="outline" size="sm" onClick={addExperience} className="mt-2"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>}
                </Section>
            </div>
        );

      case 'declaration':
        const declaration = section.content as Declaration;
        const handleDeclarationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            handleSectionContentChange(section.id, { ...declaration, [name]: value });
        };
        const handleSignatureChange = (signature: string) => {
             handleSectionContentChange(section.id, { ...declaration, signature });
        }

        return (
          <div key={section.id} className="pt-10" onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
                <Textarea name="text" value={declaration.text} onChange={handleDeclarationChange} className="italic border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>
                {isEditor && (
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="showSignature" 
                      checked={declaration.showSignature} 
                      onCheckedChange={(checked) => handleSectionContentChange(section.id, { ...declaration, showSignature: !!checked })}
                    />
                    <Label htmlFor="showSignature">Add Digital Signature</Label>
                  </div>
                )}
                {isEditor && declaration.showSignature && (
                    <div className='mt-4'>
                        <SignaturePad 
                            signature={declaration.signature}
                            onSignatureChange={handleSignatureChange}
                        />
                    </div>
                )}
                
                <div className="flex justify-between mt-8">
                    <div className="flex flex-col">
                        <div className="flex gap-1 items-center">Date: <Input name="date" type="date" value={declaration.date} onChange={handleDeclarationChange} className="border-none shadow-none focus-visible:ring-0 p-0 w-auto" /></div>
                        <div className="flex gap-1 items-center">Place: <Input name="place" value={declaration.place} onChange={handleDeclarationChange} onFocus={() => handleClearOnFocus(declaration.place, (initialSection?.content as Declaration).place, () => handleSectionContentChange(section.id, { ...declaration, place: '' }))} className="border-none shadow-none focus-visible:ring-0 p-0" /></div>
                    </div>
                    <div className="flex flex-col items-center">
                        {declaration.signature && declaration.showSignature && (
                            <Image src={declaration.signature} alt="Signature" width={150} height={50} style={{ objectFit: 'contain' }} />
                        )}
                        <p className="border-t border-gray-400 pt-1 mt-2">Signature</p>
                    </div>
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
                    {...commonSectionProps}
                    title={customSection.title}
                    onTitleChange={customSectionTitleChange}
                 >
                    <Textarea value={customSection.content} onChange={handleCustomSectionChange} onFocus={() => handleClearOnFocus(customSection.content, 'This is your new custom section. Edit the title and content as you see fit.', () => handleSectionContentChange(section.id, { ...customSection, content: '' }))} className="border-none shadow-none focus-visible:ring-0 p-0" rows={3}/>
                </Section>
            </div>
        );
      default:
        return null;
    }
  }

  const containerProps = isEditor ? {
    onClick: () => setActiveAccordionItem('layout')
  } : {};


  const editorWrapperClasses = isEditor 
    ? "p-4 sm:p-8" 
    : "w-full h-full";

  return (
     <div className={editorWrapperClasses}>
      <div
        id="resume-page"
        className="a4-page w-full h-full bg-white shadow-lg origin-top transition-transform duration-300"
        style={{
          ...pageStyle, 
          width: '100%', 
          height: '100%',
        }}
        {...containerProps}
      >
        <div
          className="p-4 sm:p-8 h-full"
          style={{ padding: `${style.pageMargins}mm`, columnGap: `${style.sectionSpacing}px` }}
        >
          {data.sections.map((section, index) => renderSection(section, index))}
        </div>
      </div>
    </div>
  );
}
