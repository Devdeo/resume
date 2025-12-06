
import { type ResumeTemplate } from './types';
import templatesData from './templates.json';

// The date in the JSON file can become stale, so we'll update it here.
const updatedTemplates = templatesData.templates.map(template => {
  const declarationSection = template.data.sections.find(s => s.type === 'declaration');
  if (declarationSection && declarationSection.content && typeof declarationSection.content === 'object' && 'date' in declarationSection.content) {
    (declarationSection.content as { date: string }).date = new Date().toLocaleDateString('en-CA');
  }
  if (template.data.rightSections) {
    const rightDeclarationSection = template.data.rightSections.find(s => s.type === 'declaration');
    if (rightDeclarationSection && rightDeclarationSection.content && typeof rightDeclarationSection.content === 'object' && 'date' in rightDeclarationSection.content) {
        (rightDeclarationSection.content as { date: string }).date = new Date().toLocaleDateString('en-CA');
    }
  }
  return template;
});


export const templates: ResumeTemplate[] = updatedTemplates as ResumeTemplate[];
