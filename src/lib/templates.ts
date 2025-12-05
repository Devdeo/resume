
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
      title: 'Extra Qualification',
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
        place: "Anytown"
      }
    }
  ]
};

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
    data: JSON.parse(JSON.stringify(baseData)),
    style: {
      fontFamily: "Playfair Display",
      fontSize: "12",
      accentColor: "#D4A274",
      sectionSpacing: "24",
      pageMargins: "25"
    }
  },
  {
    id: "template-professional",
    name: "Professional",
    data: JSON.parse(JSON.stringify(baseData)),
    style: {
      fontFamily: "Lato",
      fontSize: "10.5",
      accentColor: "#334155",
      sectionSpacing: "18",
      pageMargins: "20"
    }
  },
  {
    id: "template-minimalist",
    name: "Minimalist",
    data: JSON.parse(JSON.stringify(baseData)),
    style: {
      fontFamily: "Inter",
      fontSize: "10",
      accentColor: "#111827",
      sectionSpacing: "22",
      pageMargins: "22"
    }
  },
  {
    id: "template-academic",
    name: "Academic",
    data: JSON.parse(JSON.stringify(baseData)),
    style: {
      fontFamily: "Merriweather",
      fontSize: "11.5",
      accentColor: "#4338CA",
      sectionSpacing: "20",
      pageMargins: "20"
    }
  }
];
