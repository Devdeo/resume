'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const Section = ({ title, children, accentColor }: { title: string; children: React.ReactNode, accentColor: string }) => (
  <div className="mb-4">
    <h2 className="font-headline text-lg font-bold uppercase tracking-wider border-b-2" style={{ borderColor: accentColor }}>
      {title}
    </h2>
    <div className="mt-2">{children}</div>
  </div>
);

export default function ResumePreview() {
  const { data, style, setActiveSection } = useResume();

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
        <div className="p-8 h-full">
          <header className="text-center mb-6" onFocus={handleFocus('personalInfo')} tabIndex={0}>
            {data.personalInfo.profilePicture && (
                <div className="mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden border-4" style={{ borderColor: style.accentColor }}>
                    <Image src={data.personalInfo.profilePicture} alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
                </div>
            )}
            <h1 className="font-headline text-4xl font-bold">{data.personalInfo.name}</h1>
            <p className="text-sm">
              {data.personalInfo.address}, {data.personalInfo.zipCode} | {data.personalInfo.mobile} | {data.personalInfo.email}
            </p>
          </header>
          
          <Separator className="my-4" style={{ backgroundColor: style.accentColor, height: '2px' }}/>

          <div onFocus={handleFocus('careerObjective')} tabIndex={0}>
            <Section title="Career Objective" accentColor={style.accentColor}>
              <p>{data.careerObjective}</p>
            </Section>
          </div>

          <div onFocus={handleFocus('academicQualifications')} tabIndex={0}>
            <Section title="Academic Qualifications" accentColor={style.accentColor}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="font-bold">
                    <th className="p-1">Exam</th><th className="p-1">Board/University</th><th className="p-1">Year</th><th className="p-1">Marks %</th><th className="p-1">Division</th>
                  </tr>
                </thead>
                <tbody>
                  {data.academicQualifications.map(q => (
                    <tr key={q.id}><td className="p-1">{q.exam}</td><td className="p-1">{q.board}</td><td className="p-1">{q.year}</td><td className="p-1">{q.marks}</td><td className="p-1">{q.division}</td></tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </div>
          
          <div onFocus={handleFocus('professionalQualifications')} tabIndex={0}>
            <Section title="Professional Qualifications" accentColor={style.accentColor}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="font-bold">
                    <th className="p-1">Exam</th><th className="p-1">Board/University</th><th className="p-1">Year</th><th className="p-1">Marks %</th><th className="p-1">Division</th>
                  </tr>
                </thead>
                <tbody>
                  {data.professionalQualifications.map(q => (
                    <tr key={q.id}><td className="p-1">{q.exam}</td><td className="p-1">{q.board}</td><td className="p-1">{q.year}</td><td className="p-1">{q.marks}</td><td className="p-1">{q.division}</td></tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </div>

          <div onFocus={handleFocus('extraQualification')} tabIndex={0}>
            <Section title="Extra Qualification" accentColor={style.accentColor}>
              <p>{data.extraQualification}</p>
            </Section>
          </div>
          
          <div onFocus={handleFocus('workExperience')} tabIndex={0}>
            <Section title="Work Experience" accentColor={style.accentColor}>
              {data.workExperience.map(exp => (
                <div key={exp.id} className="mb-2">
                  <h3 className="font-bold">{exp.role} - {exp.company}</h3>
                  <p className="text-xs font-semibold" style={{ color: style.accentColor }}>{exp.duration}</p>
                  <p className="text-sm">{exp.responsibilities}</p>
                </div>
              ))}
            </Section>
          </div>

          <div className="absolute bottom-8 left-8 right-8" onFocus={handleFocus('declaration')} tabIndex={0}>
            <Section title="Declaration" accentColor={style.accentColor}>
                <p className="italic">{data.declaration.text}</p>
                <div className="flex justify-between mt-4">
                    <p>Date: {data.declaration.date}</p>
                    <p>Place: {data.declaration.place}</p>
                </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
