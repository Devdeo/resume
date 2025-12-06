
import { type ResumeTemplate, type ResumeData } from './types';
import { PlaceHolderImages } from './placeholder-images';

const defaultProfilePic = PlaceHolderImages.find(img => img.id === 'profile-pic-default')?.imageUrl || '';

const baseData: ResumeData = {
  sections: [
    {
      id: 'personalInfo',
      type: 'personalInfo',
      title: 'Personal Info',
      deletable: false,
      content: {
        name: "John Doe",
        address: "123 Main Street, Anytown, USA",
        mobile: "+1 (555) 123-4567",
        email: "john.doe@example.com",
        dob: "1995-08-15",
        fatherName: "Richard Doe",
        motherName: "Jane Doe",
        nationality: "American",
        gender: 'Male' as const,
        maritalStatus: 'Single' as const,
        languages: "English, Spanish",
        hobbies: "Reading, Hiking, Photography",
        zipCode: "12345",
        profilePicture: defaultProfilePic
      }
    },
    {
      id: 'careerObjective',
      type: 'careerObjective',
      title: 'Career Objective',
      deletable: true,
      content: "Secure a responsible career opportunity to fully utilize my training and skills, while making a significant contribution to the success of the company."
    },
    {
      id: 'academicQualifications',
      type: 'academicQualifications',
      title: 'Academic Qualifications',
      deletable: true,
      content: [
        { id: 'aq1', exam: "Bachelor of Science in Computer Science", board: "State University", year: "2017", marks: "85%", division: "First" }
      ]
    },
    {
      id: 'professionalQualifications',
      type: 'professionalQualifications',
      title: 'Professional Qualifications',
      deletable: true,
      content: [
        { id: 'pq1', exam: "Certified Web Developer", board: "Online Institute", year: "2018", marks: "90%", division: "First" }
      ]
    },
    {
      id: 'extraQualification',
      type: 'extraQualification',
      title: 'Skills & Expertise',
      deletable: true,
      content: "Proficient in MERN stack, Next.js, and TypeScript."
    },
    {
      id: 'workExperience',
      type: 'workExperience',
      title: 'Work Experience',
      deletable: true,
      content: [
        { id: 'we1', company: "Tech Solutions Inc.", role: "Software Engineer", duration: "2018 - Present", responsibilities: "Developed and maintained web applications, collaborated with cross-functional teams, and implemented new features." }
      ]
    },
    {
      id: 'declaration',
      type: 'declaration',
      title: 'Declaration',
      deletable: true,
      content: {
        text: "I hereby declare that all the statements made in this resume are true, complete, and correct to the best of my knowledge.",
        date: new Date().toLocaleDateString('en-CA'),
        place: "Anytown",
        showSignature: false,
        signature: ""
      }
    }
  ]
};

const creativeData = JSON.parse(JSON.stringify(baseData));
const creativePersonalInfo = creativeData.sections.find(s => s.type === 'personalInfo');
if(creativePersonalInfo) {
  (creativePersonalInfo.content as any).name = "Jane Smith";
  (creativePersonalInfo.content as any).email = "jane.smith@example.com";
}

const professionalData = JSON.parse(JSON.stringify(baseData));
const professionalPersonalInfo = professionalData.sections.find(s => s.type === 'personalInfo');
if(professionalPersonalInfo) {
    (professionalPersonalInfo.content as any).name = "Robert Johnson";
    (professionalPersonalInfo.content as any).email = "robert.j@example.com";
}
// Reorder for professional template
const expIndex = professionalData.sections.findIndex(s => s.type === 'workExperience');
const [expSection] = professionalData.sections.splice(expIndex, 1);
professionalData.sections.splice(1, 0, expSection); // Move experience after personal info


const minimalistData = JSON.parse(JSON.stringify(baseData));
const minimalistPersonalInfo = minimalistData.sections.find(s => s.type === 'personalInfo');
if(minimalistPersonalInfo) {
    (minimalistPersonalInfo.content as any).name = "Emily White";
    (minimalistPersonalInfo.content as any).email = "emily.white@example.com";
}
// Remove some sections for minimalist template
minimalistData.sections = minimalistData.sections.filter(s => !['professionalQualifications', 'declaration'].includes(s.type));


export const templates: ResumeTemplate[] = [
  {
    id: "template-modern",
    name: "Modern",
    data: JSON.parse(JSON.stringify(baseData)),
    style: {
      fontFamily: "PT Sans",
      fontSize: "11",
      accentColor: "#008080",
      sectionSpacing: "20",
      pageMargins: "20"
    }
  },
  {
    id: "template-creative",
    name: "Creative",
    data: creativeData,
    style: {
      fontFamily: "Playfair Display",
      fontSize: "12",
      accentColor: "#D2691E",
      sectionSpacing: "24",
      pageMargins: "25"
    }
  },
  {
    id: "template-professional",
    name: "Professional",
    data: professionalData,
    style: {
      fontFamily: "Lato",
      fontSize: "10",
      accentColor: "#2c3e50",
      sectionSpacing: "18",
      pageMargins: "22"
    }
  },
  {
    id: "template-minimalist",
    name: "Minimalist",
    data: minimalistData,
    style: {
      fontFamily: "Inter",
      fontSize: "10.5",
      accentColor: "#333333",
      sectionSpacing: "28",
      pageMargins: "18"
    }
  }
];
