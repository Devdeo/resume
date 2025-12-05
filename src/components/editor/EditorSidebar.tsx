'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion } from '@/components/ui/accordion';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ObjectiveForm from './forms/ObjectiveForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import DeclarationForm from './forms/DeclarationForm';
import StyleControls from './StyleControls';
import { useResume } from '@/hooks/useResume';

export default function EditorSidebar() {
  const { activeSection, setActiveSection } = useResume();

  return (
    <aside className="w-96 border-l bg-background no-print flex flex-col">
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 rounded-none">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <Accordion type="single" collapsible value={activeSection} onValueChange={setActiveSection} className="w-full p-4">
              <PersonalInfoForm />
              <ObjectiveForm />
              <EducationForm type="academic" />
              <EducationForm type="professional" />
              <SkillsForm />
              <ExperienceForm />
              <DeclarationForm />
            </Accordion>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="style" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              <StyleControls />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
