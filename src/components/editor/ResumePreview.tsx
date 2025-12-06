
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
  isPreview?: boolean;
};


const Section = ({ title, children, accentColor, onTitleChange, deletable, onDelete, onDragStart, onDragOver, onDragEnd, draggable, isDragging, isPreview }: { title: string; children: React.ReactNode; accentColor: string; onTitleChange: (newTitle: string) => void; deletable?: boolean; onDelete?: () => void; onDragStart: () => void; onDragOver: (e: React.DragEvent) => void; onDragEnd: () => void; draggable?: boolean; isDragging: boolean; isPreview?: boolean; }) => (
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
         <div draggable onDragStart={onDragStart} className="cursor-grab opacity-0 group-hover:opacity-100 pr-2 no-print">
           <GripVertical className="h-5 w-5 text-muted-foreground" />
         </div>
       )}
      {isPreview ? (
        <h2 className="font-headline text-lg font-bold uppercase tracking-wider p-0 h-auto" style={{ paddingLeft: deletable ? 0 : '0.5rem' }}>{title}</h2>
      ) : (
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="font-headline text-lg font-bold uppercase tracking-wider border-none shadow-none focus-visible:ring-0 p-0 h-auto"
          style={{ paddingLeft: deletable ? 0 : '0.5rem' }}
        />
      )}
      {deletable && (
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute -right-8 top-0 no-print" onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      )}
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

export default function ResumePreview(props: ResumePreviewProps) {
  const resumeContext = useResume();
  
  const isEditor = !!resumeContext && !props.isPreview;
  
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

  const [isExporting, setIsExporting] = React.useState(false);

  React.useEffect(() => {
    const handlePdfExport = () => {
      const isExporting = document.body.classList.contains('pdf-export');
      setIsExporting(isExporting);
    };

    const observer = new MutationObserver(handlePdfExport);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const isFinalPreview = props.isPreview || isExporting;

  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleSectionContentChange = (sectionId: string, newContent: SectionContent) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, content: newContent } : s),
      rightSections: prev.rightSections?.map(s => s.id === sectionId ? { ...s, content: newContent } : s)
    }));
  };

  const handleSectionTitleChange = (sectionId: string, newTitle: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, title: newTitle } : s),
      rightSections: prev.rightSections?.map(s => s.id === sectionId ? { ...s, title: newTitle } : s)
    }));
  };
  
  const deleteSection = (sectionId: string) => {
    setData(prev => ({ 
      ...prev, 
      sections: prev.sections.filter(s => s.id !== sectionId),
      rightSections: prev.rightSections?.filter(s => s.id !== sectionId)
    }));
  };

  const handleFocus = (sectionId: string) => () => {
    setActiveSection(sectionId);
    setActiveAccordionItem('typography');
  };

  const handleClearOnFocus = (sectionId: string, fieldName: string, currentValue: string, fieldId?: string) => {
    if (!isEditor) return;
    if (sectionId === 'careerObjective' || sectionId.startsWith('declaration')) return;

    let initialSectionData;
    if (fieldId) {
        const initialParentSection = initialData.sections.find(s => s.id === sectionId) || initialData.rightSections?.find(s => s.id === sectionId);
        if (initialParentSection && Array.isArray(initialParentSection.content)) {
            initialSectionData = initialParentSection.content.find((item: any) => item.id === fieldId);
        }
    } else {
        initialSectionData = initialData.sections.find(s => s.id === sectionId) || initialData.rightSections?.find(s => s.id === sectionId);
    }
    
    if (initialSectionData) {
        const initialValue = (initialSectionData.content as any)?.[fieldName] ?? (initialSectionData as any)?.[fieldName];

        if (currentValue === initialValue) {
            let currentSection = data.sections.find(s => s.id === sectionId) || data.rightSections?.find(s => s.id === sectionId);
            if (currentSection) {
                let newContent;
                if (fieldId && Array.isArray(currentSection.content)) {
                    newContent = currentSection.content.map((item: any) => {
                        if (item.id === fieldId) {
                            return { ...item, [fieldName]: '' };
                        }
                        return item;
                    });
                } else {
                    newContent = { ...currentSection.content as object, [fieldName]: '' };
                }
                handleSectionContentChange(sectionId, newContent as SectionContent);
            }
        }
    }
};

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const personalInfoSection = data.sections.find(s => s.type === 'personalInfo') || data.rightSections?.find(s => s.type === 'personalInfo');
    if (!personalInfoSection) return;

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
          const newContent = { ...(personalInfoSection.content as PersonalInfo), profilePicture: event.target.result as string };
          handleSectionContentChange(personalInfoSection.id, newContent);
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

  const renderSection = (section: ResumeSection) => {
    const onTitleChange = (newTitle: string) => handleSectionTitleChange(section.id, newTitle);
    const onDelete = () => deleteSection(section.id);

    const isDraggable = section.type !== 'personalInfo';
    
    switch (section.type) {
      case 'personalInfo':
        const personalInfo = section.content as PersonalInfo;
        const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            handleSectionContentChange(section.id, { ...personalInfo, [name]: value });
        };
        const defaultProfilePic = PlaceHolderImages.find(img => img.id === 'profile-pic-default')?.imageUrl || '';

        const hasProfilePic = personalInfo.profilePicture && personalInfo.profilePicture !== defaultProfilePic;

        const personalInfoContainerClasses = data.layout === 'two-column-left' 
            ? 'text-left mb-4' 
            : 'text-center mb-4';
        
        const photoClasses = data.layout === 'two-column-left'
            ? 'mx-0 mb-4 h-32 w-32'
            : 'mx-auto mb-4 h-32 w-32';
        
        const nameInputClasses = data.layout === 'two-column-left'
            ? "font-headline text-4xl font-bold text-left border-none shadow-none focus-visible:ring-0 h-auto p-0"
            : "font-headline text-4xl font-bold text-center border-none shadow-none focus-visible:ring-0 h-auto p-0";
        
        const contactInfoClasses = data.layout === 'two-column-left'
            ? "text-sm flex flex-col items-start gap-x-1"
            : "text-sm flex justify-center items-center gap-x-1 flex-wrap";
        
        const contactInputClasses = data.layout === 'two-column-left'
            ? "border-none shadow-none focus-visible:ring-0 h-auto p-0 text-left"
            : "border-none shadow-none focus-visible:ring-0 h-auto p-0 text-center";


        return (
          <header key={section.id} className={`${personalInfoContainerClasses} relative group`} onFocus={handleFocus(section.id)} tabIndex={0} onDragOver={(e) => onDragOver?.(e, section.id)}>
             {isEditor && onDragStart && (
                <div draggable onDragStart={() => onDragStart(section.id)} className="cursor-grab opacity-0 group-hover:opacity-100 absolute left-2 top-2 no-print">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
             )}
            <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            
            {hasProfilePic && (
                <div className={`${photoClasses} rounded-full overflow-hidden border-4 flex items-center justify-center`} style={{ borderColor: style.accentColor }}>
                    <Image src={personalInfo.profilePicture} alt="Profile" width={128} height={128} className={`object-cover w-full h-full ${!isFinalPreview ? 'cursor-pointer' : ''}`} onClick={() => !isFinalPreview && imageInputRef.current?.click()} />
                </div>
            )}
            
            {!isFinalPreview && !hasProfilePic && (
                <div className={`${photoClasses} rounded-full overflow-hidden border-4 flex items-center justify-center no-print`} style={{ borderColor: style.accentColor }}>
                    <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground cursor-pointer" onClick={() => imageInputRef.current?.click()}>
                        <ImagePlus className="w-10 h-10" />
                        <span className="text-xs mt-1">Add Photo</span>
                    </div>
                </div>
            )}

            {isFinalPreview ? <h1 className={nameInputClasses.replace('border-none shadow-none focus-visible:ring-0 h-auto p-0', '')}>{personalInfo.name}</h1> : <Input name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(section.id, 'name', personalInfo.name)} placeholder="Your Name" className={nameInputClasses} />}
            <div className={contactInfoClasses}>
                {isFinalPreview ? <p className={contactInputClasses}>{personalInfo.address}</p> : <Input name="address" value={personalInfo.address} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(section.id, 'address', personalInfo.address)} placeholder="Address" className={contactInputClasses} />}
                {isFinalPreview ? <p className={`${contactInputClasses} ${data.layout !== 'two-column-left' ? 'w-16' : ''}`}>{personalInfo.zipCode}</p> : <Input name="zipCode" value={personalInfo.zipCode} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(section.id, 'zipCode', personalInfo.zipCode)} placeholder="ZIP" className={`${contactInputClasses} ${data.layout !== 'two-column-left' ? 'w-16' : ''}`} />}
                {isFinalPreview ? <p className={contactInputClasses}>{personalInfo.mobile}</p> : <Input name="mobile" value={personalInfo.mobile} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(section.id, 'mobile', personalInfo.mobile)} placeholder="Mobile" className={contactInputClasses} />}
                {isFinalPreview ? <p className={contactInputClasses}>{personalInfo.email}</p> : <Input name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} onFocus={() => handleClearOnFocus(section.id, 'email', personalInfo.email)} placeholder="Email" className={contactInputClasses} />}
            </div>
            {data.layout === 'single-column' && <Separator className="my-2" style={{ backgroundColor: style.accentColor, height: '2px' }} />}
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
      isDragging: draggingItem === section.id,
      isPreview: isFinalPreview,
    };

    switch (section.type) {
        case 'careerObjective':
        const careerObjective = section.content as string;
        return (
          <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
              {isFinalPreview ? <p className="p-0">{careerObjective}</p> : <Textarea value={careerObjective} onChange={e => handleSectionContentChange(section.id, e.target.value)} onFocus={() => handleClearOnFocus(section.id, 'content', careerObjective)} className="border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>}
            </Section>
          </div>
        );

      case 'academicQualifications':
      case 'professionalQualifications':
        const qualifications = section.content as AcademicQualification[];
        const addQualification = () => {
            const newQualification: AcademicQualification = { id: Date.now().toString(), exam: 'New Degree', board: 'University Name', year: 'Year', marks: 'Grade', division: 'N/A' };
            handleSectionContentChange(section.id, [...qualifications, newQualification]);
        };
        const removeQualification = (index: number) => {
            const updated = qualifications.filter((_, i) => i !== index);
            handleSectionContentChange(section.id, updated);
        };
        const handleQualificationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const updated = [...qualifications];
            updated[index] = { ...updated[index], [name]: value };
            handleSectionContentChange(section.id, updated);
        };
        return (
          <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
              <div className="space-y-2">
                {isFinalPreview ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                <th style={{ width: '35%', padding: '4px 0' }}>Exam/Degree</th>
                                <th style={{ width: '30%', padding: '4px 0' }}>Board/University</th>
                                <th style={{ width: '10%', padding: '4px 0' }}>Year</th>
                                <th style={{ width: '10%', padding: '4px 0' }}>Marks</th>
                                <th style={{ width: '15%', padding: '4px 0' }}>Division</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qualifications.map((q) => (
                                <tr key={q.id} style={{ borderTop: '1px solid #eee' }}>
                                    <td style={{ padding: '4px 0' }}>{q.exam}</td>
                                    <td style={{ padding: '4px 0' }}>{q.board}</td>
                                    <td style={{ padding: '4px 0' }}>{q.year}</td>
                                    <td style={{ padding: '4px 0' }}>{q.marks}</td>
                                    <td style={{ padding: '4px 0' }}>{q.division}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    qualifications.map((q, index) => (
                      <div key={q.id} className="group relative">
                        <div className="flex gap-2 items-center">
                              <Input name="exam" value={q.exam} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'exam', q.exam, q.id)} placeholder="Exam/Degree" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1 font-semibold" />
                              <Input name="board" value={q.board} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'board', q.board, q.id)} placeholder="Board/University" className="border-none shadow-none focus-visible:ring-0 p-0 flex-1" />
                              <Input name="year" value={q.year} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'year', q.year, q.id)} placeholder="Year" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                              <Input name="marks" value={q.marks} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'marks', q.marks, q.id)} placeholder="Marks %" className="border-none shadow-none focus-visible:ring-0 p-0 w-16" />
                              <Input name="division" value={q.division} onChange={(e) => handleQualificationChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'division', q.division, q.id)} placeholder="Division" className="border-none shadow-none focus-visible:ring-0 p-0 w-20" />
                              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 no-print" onClick={() => removeQualification(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                      </div>
                    ))
                )}
              </div>
              {isEditor && !isFinalPreview && <Button variant="outline" size="sm" onClick={addQualification} className="mt-2 no-print"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>}
            </Section>
          </div>
        );
      
      case 'extraQualification':
        const extraQualification = section.content as string;
        return (
          <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
            <Section {...commonSectionProps}>
              {isFinalPreview ? <p className="p-0">{extraQualification}</p> : <Textarea value={extraQualification} onChange={e => handleSectionContentChange(section.id, e.target.value)} onFocus={() => handleClearOnFocus(section.id, 'content', extraQualification)} className="border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>}
            </Section>
          </div>
        );

      case 'workExperience':
        const workExperience = section.content as WorkExperience[];
        const addExperience = () => {
            const newExperience: WorkExperience = { id: Date.now().toString(), company: 'Company Name', role: 'Your Role', duration: 'From - To', responsibilities: 'Your responsibilities and achievements.' };
            handleSectionContentChange(section.id, [...workExperience, newExperience]);
        };
        const removeExperience = (index: number) => {
            const updated = workExperience.filter((_, i) => i !== index);
            handleSectionContentChange(section.id, updated);
        };
        const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            const updated = [...workExperience];
            updated[index] = { ...updated[index], [name]: value };
            handleSectionContentChange(section.id, updated);
        };
        return (
            <div key={section.id} onFocus={handleFocus(section.id)} tabIndex={0}>
                <Section {...commonSectionProps}>
                <div className="space-y-2">
                    {workExperience.map((exp, index) => (
                        <div key={exp.id} className="group flex flex-col">
                            {isFinalPreview ? (
                                <div className="flex flex-col mb-2">
                                    <div className="flex justify-between items-baseline">
                                        <div className="flex items-baseline">
                                            <p className="font-bold mr-2">{exp.role}</p>
                                            <p className="font-semibold">{exp.company}</p>
                                        </div>
                                        <p className="text-xs font-medium" style={{ color: style.accentColor, minWidth: '80px', textAlign: 'right' }}>{exp.duration}</p>
                                    </div>
                                    <p className="text-sm mt-1">{exp.responsibilities}</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-1 items-center">
                                            <Input name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'role', exp.role, exp.id)} placeholder="Role" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                                            <span>-</span>
                                            <Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'company', exp.company, exp.id)} placeholder="Company" className="font-bold border-none shadow-none focus-visible:ring-0 p-0" />
                                        </div>
                                        <Input name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'duration', exp.duration, exp.id)} placeholder="Duration" className="text-xs font-semibold border-none shadow-none focus-visible:ring-0 p-0 text-right w-24" style={{ color: style.accentColor }} />
                                    </div>
                                    <div className="flex items-start">
                                    <Textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, e)} onFocus={() => handleClearOnFocus(section.id, 'responsibilities', exp.responsibilities, exp.id)} placeholder="Responsibilities" className="text-sm border-none shadow-none focus-visible:ring-0 p-0 flex-1" rows={2} />
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 no-print" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                {isEditor && !isFinalPreview && <Button variant="outline" size="sm" onClick={addExperience} className="mt-2 no-print"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>}
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
                {isFinalPreview ? <p className="italic">{declaration.text}</p> : <Textarea name="text" value={declaration.text} onChange={handleDeclarationChange} onFocus={() => handleClearOnFocus(section.id, 'text', declaration.text)} className="italic border-none shadow-none focus-visible:ring-0 p-0" rows={2}/>}
                
                {!isFinalPreview && isEditor && (
                  <div className="flex items-center space-x-2 mt-4 no-print">
                    <Checkbox 
                      id="showSignature" 
                      checked={declaration.showSignature} 
                      onCheckedChange={(checked) => handleSectionContentChange(section.id, { ...declaration, showSignature: !!checked })}
                    />
                    <Label htmlFor="showSignature">Add Digital Signature</Label>
                  </div>
                )}
                {!isFinalPreview && isEditor && declaration.showSignature && (
                    <div className='mt-4 no-print'>
                        <SignaturePad 
                            signature={declaration.signature}
                            onSignatureChange={handleSignatureChange}
                        />
                    </div>
                )}
                
                <div className="flex justify-between mt-8">
                    <div className="flex flex-col">
                        <div className="flex gap-1 items-center">Date: {isFinalPreview ? declaration.date : <Input name="date" type="date" value={declaration.date} onChange={handleDeclarationChange} className="border-none shadow-none focus-visible:ring-0 p-0 w-auto" />}</div>
                        <div className="flex gap-1 items-center">Place: {isFinalPreview ? declaration.place : <Input name="place" value={declaration.place} onChange={handleDeclarationChange} onFocus={() => handleClearOnFocus(section.id, 'place', declaration.place)} className="border-none shadow-none focus-visible:ring-0 p-0" />}</div>
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
                    {isFinalPreview ? <p className="p-0">{customSection.content}</p> : <Textarea value={customSection.content} onChange={handleCustomSectionChange} onFocus={() => handleClearOnFocus(section.id, 'content', customSection.content, customSection.id)} className="border-none shadow-none focus-visible:ring-0 p-0" rows={3}/>}
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
    : "w-full h-full bg-white";
    
  const renderColumn = (sections: ResumeSection[]) => (
    <div className='flex flex-col'>
      {sections.map((section) => renderSection(section))}
    </div>
  )

  const renderLayout = () => {
    switch (data.layout) {
      case 'two-column-left':
        return (
          <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-1">{renderColumn(data.sections)}</div>
            <div className="col-span-2">{renderColumn(data.rightSections || [])}</div>
          </div>
        );
      case 'two-column-right':
         return (
          <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-2">{renderColumn(data.sections)}</div>
            <div className="col-span-1">{renderColumn(data.rightSections || [])}</div>
          </div>
        );
      case 'single-column':
      default:
        return renderColumn(data.sections);
    }
  }
  
  const a4PageStyle: React.CSSProperties = {
    width: '210mm',
    height: '297mm',
    backgroundColor: 'white'
  };
  
  const pageContentStyle: React.CSSProperties = {
    ...pageStyle,
    padding: `${style.pageMargins}mm`,
    width: '100%',
    height: '100%'
  };

  const a4PageEditorStyle: React.CSSProperties = { ...a4PageStyle };

  if (isEditor && !isExporting) {
    a4PageEditorStyle.transform = 'scale(0.8)';
    a4PageEditorStyle.transformOrigin = 'top center';
    a4PageEditorStyle.margin = '2rem auto';
    a4PageEditorStyle.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    a4PageEditorStyle.minHeight = '297mm';
  }


  return (
     <div className={editorWrapperClasses}>
        <div id="resume-page" className="a4-page hidden md:block" style={a4PageEditorStyle} {...containerProps}>
          <div className="h-full" style={pageContentStyle}>
            {renderLayout()}
          </div>
        </div>
        <div id="resume-page-mobile" className="md:hidden" style={{...pageStyle, padding: `${style.pageMargins}mm` }}>
           {renderLayout()}
        </div>
    </div>
  );
}
