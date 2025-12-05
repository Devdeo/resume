import { templates } from '@/lib/templates';
import EditorLayout from '@/components/editor/EditorLayout';
import { notFound } from 'next/navigation';

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const template = templates.find(t => t.id === params.templateId);

  if (!template) {
    notFound();
  }
  
  return <EditorLayout initialTemplate={template} />;
}

export function generateStaticParams() {
  return templates.map((template) => ({
    templateId: template.id,
  }));
}
