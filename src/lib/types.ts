
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
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  academicQualifications: AcademicQualification[];
  professionalQualifications: AcademicQualification[];
  extraQualification: string;
  workExperience: WorkExperience[];
  declaration: Declaration;
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
