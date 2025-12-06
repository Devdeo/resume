
export interface PersonalInfo {
  name: string;
  address: string;
  mobile: string;
  email: string;
  dob: string;
  fatherName: string;
  motherName: string;
  nationality: string;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced';
  languages: string;
  hobbies: string;
  zipCode: string;
  profilePicture: string;
}

export interface AcademicQualification {
  id: string;
  exam: string;
  board: string;
  year: string;
  marks: string;
  division: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string;
}

export interface Declaration {
  text: string;
  date: string;
  place: string;
  showSignature: boolean;
  signature: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export type SectionType =
  | 'personalInfo'
  | 'careerObjective'
  | 'academicQualifications'
  | 'professionalQualifications'
  | 'extraQualification'
  | 'workExperience'
  | 'declaration'
  | 'custom';

export type SectionContent = PersonalInfo | string | AcademicQualification[] | WorkExperience[] | Declaration | CustomSection;

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  content: SectionContent;
  deletable?: boolean;
}

export interface ResumeData {
  layout: 'single-column' | 'two-column-right' | 'two-column-left';
  sections: ResumeSection[];
  rightSections?: ResumeSection[];
}

export interface ResumeStyle {
  fontFamily: string;
  fontSize: string;
  accentColor: string;
  sectionSpacing: string;
  pageMargins: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  data: ResumeData;
  style: ResumeStyle;
}
