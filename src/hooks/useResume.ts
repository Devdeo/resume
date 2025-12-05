'use client';

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import { type ResumeData, type ResumeStyle } from '@/lib/types';

type ResumeContextType = {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  style: ResumeStyle;
  setStyle: Dispatch<SetStateAction<ResumeStyle>>;
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
  activeAccordionItem: string;
  setActiveAccordionItem: Dispatch<SetStateAction<string>>;
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ResumeContext.Provider;

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
