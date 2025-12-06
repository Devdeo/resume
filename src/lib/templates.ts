
import { type ResumeTemplate, type ResumeData } from './types';
import { PlaceHolderImages } from './placeholder-images';

const defaultProfilePic = PlaceHolderImages.find(img => img.id === 'profile-pic-default')?.imageUrl || '';

const baseData: ResumeData = {
  layout: 'single-column',
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
      id: 'workExperience',
      type: 'workExperience',
      title: 'Work Experience',
      deletable: true,
      content: [
        { id: 'we1', company: "Tech Solutions Inc.", role: "Software Engineer", duration: "2018 - Present", responsibilities: "Developed and maintained web applications, collaborated with cross-functional teams, and implemented new features." }
      ]
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

const professionalTemplate: ResumeTemplate = {
    id: "template-professional",
    name: "Professional",
    style: {
      fontFamily: "Lato",
      fontSize: "10",
      accentColor: "#2c3e50",
      sectionSpacing: "18",
      pageMargins: "22"
    },
    data: {
      layout: 'two-column-left',
      sections: [
        {
          id: 'personalInfo',
          type: 'personalInfo',
          title: 'Personal Info',
          deletable: false,
          content: {
            name: "Robert Johnson",
            address: "456 Corporate Blvd, Business City",
            mobile: "+1 (555) 987-6543",
            email: "robert.j@example.com",
            dob: "1990-01-20",
            fatherName: "Charles Johnson",
            motherName: "Mary Johnson",
            nationality: "Canadian",
            gender: 'Male' as const,
            maritalStatus: 'Married' as const,
            languages: "English, French",
            hobbies: "Golf, Chess",
            zipCode: "54321",
            profilePicture: defaultProfilePic
          }
        },
        {
          id: 'extraQualification',
          type: 'extraQualification',
          title: 'Skills',
          deletable: true,
          content: "Project Management\nAgile Methodologies\nTeam Leadership\nBudgeting & Forecasting"
        },
        {
          id: 'professionalQualifications',
          type: 'professionalQualifications',
          title: 'Certifications',
          deletable: true,
          content: [
            { id: 'pq1', exam: "PMP", board: "PMI", year: "2019", marks: "N/A", division: "Certified" }
          ]
        },
      ],
      rightSections: [
        {
            id: 'careerObjective',
            type: 'careerObjective',
            title: 'Career Summary',
            deletable: true,
            content: "Experienced project manager with over 10 years of experience in the tech industry, seeking to leverage my skills in a challenging senior leadership role."
        },
        {
            id: 'workExperience',
            type: 'workExperience',
            title: 'Work Experience',
            deletable: true,
            content: [
                { id: 'we1', company: "Innovate Corp", role: "Senior Project Manager", duration: "2015 - Present", responsibilities: "Led cross-functional teams to deliver complex software projects on time and within budget." },
                { id: 'we2', company: "Data Systems", role: "Project Manager", duration: "2010 - 2015", responsibilities: "Managed software development lifecycle for various client projects." }
            ]
        },
        {
            id: 'academicQualifications',
            type: 'academicQualifications',
            title: 'Education',
            deletable: true,
            content: [
                { id: 'aq1', exam: "MBA", board: "University of Business", year: "2010", marks: "3.8/4.0", division: "Distinction" },
                { id: 'aq2', exam: "B.Eng", board: "Tech University", year: "2008", marks: "88%", division: "First" }
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
            place: "Business City",
            showSignature: false,
            signature: ""
          }
      }
      ]
    }
};

const minimalistTemplate: ResumeTemplate = {
    id: "template-minimalist",
    name: "Minimalist",
    style: {
      fontFamily: "Inter",
      fontSize: "10.5",
      accentColor: "#333333",
      sectionSpacing: "28",
      pageMargins: "18"
    },
    data: {
      layout: 'single-column',
      sections: [
        {
          id: 'personalInfo',
          type: 'personalInfo',
          title: 'Personal Info',
          deletable: false,
          content: {
            name: "Emily White",
            address: "789 Simple St, Clean City",
            mobile: "+1 (555) 555-5555",
            email: "emily.white@example.com",
            dob: "1998-06-25",
            fatherName: "George White",
            motherName: "Helen White",
            nationality: "Australian",
            gender: 'Female' as const,
            maritalStatus: 'Single' as const,
            languages: "English",
            hobbies: "Yoga, Painting",
            zipCode: "67890",
            profilePicture: ''
          }
        },
        {
          id: 'careerObjective',
          type: 'careerObjective',
          title: 'Objective',
          deletable: true,
          content: "A detail-oriented designer seeking to apply my skills in UI/UX to create intuitive and beautiful user experiences."
        },
        {
          id: 'workExperience',
          type: 'workExperience',
          title: 'Experience',
          deletable: true,
          content: [
            { id: 'we1', company: "Creative Agency", role: "UI/UX Designer", duration: "2020 - Present", responsibilities: "Designing user interfaces for web and mobile applications." }
          ]
        },
        {
          id: 'academicQualifications',
          type: 'academicQualifications',
          title: 'Education',
          deletable: true,
          content: [
            { id: 'aq1', exam: "Bachelor of Design", board: "Design College", year: "2020", marks: "N/A", division: "Honors" }
          ]
        },
        {
          id: 'extraQualification',
          type: 'extraQualification',
          title: 'Skills',
          deletable: true,
          content: "Figma, Sketch, Adobe XD, Prototyping, Wireframing"
        },
        {
            id: 'declaration',
            type: 'declaration',
            title: 'Declaration',
            deletable: true,
            content: {
              text: "I hereby declare that the information provided is true and correct.",
              date: new Date().toLocaleDateString('en-CA'),
              place: "Clean City",
              showSignature: false,
              signature: ""
            }
        }
      ]
    }
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
  professionalTemplate,
  minimalistTemplate
];

    