// Team member data based on actual member profiles
export interface TeamMember {
  id: string;
  name: string;
  email?: string; // For admin management
  role: string;
  title: string;
  bio: string;
  avatar?: string; // Alias for image
  specializations: string[];
  industries: string[];
  skills: string[];
  experience: string;
  education: string[];
  certifications: string[];
  achievements: string[];
  image?: string;
  isActive: boolean;
  joinDate: string;
  isFoundingMember?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: "member-2",
    name: "Technical Writing Specialist",
    role: "Senior Technical Writer & Operations Coordinator",
    title: "Founding Member",
    bio: "Experienced technical writing specialist focused on software documentation, API guides, and engineering processes. Leads operations coordination and quality assurance for the cooperative.",
    specializations: [
      "Software Documentation",
      "API Documentation", 
      "Engineering Documentation",
      "Healthcare Technology Documentation",
      "Training Materials"
    ],
    industries: [
      "Software Development",
      "Engineering", 
      "Healthcare Technology",
      "Financial Services"
    ],
    skills: [
      "Confluence", "GitBook", "MindTouch", "Notion", "Markdown",
      "Adobe Creative Suite", "Figma", "HTML/CSS", "Python", "Git"
    ],
    experience: "Specializes in technical documentation development, client project management, and quality assurance oversight",
    education: [
      "Technical Communication Certificate",
      "Advanced API Documentation Training"
    ],
    certifications: [
      "Society for Technical Communication (STC)",
      "Write the Docs Community"
    ],
    achievements: [
      "Led documentation initiatives for major software releases",
      "Developed comprehensive API documentation for multiple platforms",
      "Implemented workflows reducing production time significantly",
      "Managed documentation teams across multiple projects"
    ],
    isActive: true,
    joinDate: "June 2025",
    isFoundingMember: true
  },
  {
    id: "member-3", 
    name: "UX Writer & Content Strategist",
    role: "UX Writer & Digital Content Specialist",
    title: "Content Strategy Lead",
    bio: "Expert in user experience writing, content strategy, and accessibility. Specializes in creating intuitive digital experiences and inclusive design solutions.",
    specializations: [
      "UX Writing",
      "Content Strategy", 
      "Digital Documentation",
      "Accessibility Documentation",
      "Information Architecture"
    ],
    industries: [
      "SaaS Platforms",
      "Mobile Applications",
      "E-commerce",
      "FinTech"
    ],
    skills: [
      "Figma", "Sketch", "Adobe XD", "InVision", "Miro",
      "Contentful", "Strapi", "Google Analytics", "WAVE", "axe"
    ],
    experience: "Focuses on user experience writing, content strategy development, and accessibility consulting for digital products",
    education: [
      "Human-Computer Interaction Degree",
      "UX Design Certificate",
      "Accessibility Certification"
    ],
    certifications: [
      "UX Writers Collective",
      "International Association of Accessibility Professionals (IAAP)",
      "WCAG 2.1 Compliance"
    ],
    achievements: [
      "Led content strategy for successful product launches",
      "Implemented accessibility standards improving usability",
      "Conducted content audits and user research for multiple organizations",
      "Presented at UX Week and Content Strategy Forum"
    ],
    isActive: true,
    joinDate: "Member since founding",
    isFoundingMember: true
  },
  {
    id: "member-4",
    name: "Scientific & Medical Writer", 
    role: "Senior Scientific Writer & Regulatory Specialist",
    title: "Scientific Writing Lead",
    bio: "PhD-level scientific writer specializing in regulatory documentation, clinical trials, and medical device submissions. Expert in FDA compliance and grant writing.",
    specializations: [
      "Regulatory Documentation",
      "Clinical Trial Materials", 
      "Scientific Publications",
      "Grant Applications",
      "Medical Device Documentation"
    ],
    industries: [
      "Pharmaceutical",
      "Medical Devices",
      "Biotechnology", 
      "Academic Research"
    ],
    skills: [
      "Veeva Vault", "MasterControl", "SAS", "R", "SPSS",
      "EndNote", "Mendeley", "LaTeX", "CTMS platforms"
    ],
    experience: "Specializes in scientific and medical documentation, regulatory compliance writing, and clinical trial protocols",
    education: [
      "Ph.D. in Scientific Field",
      "Medical Writing Certificate", 
      "Regulatory Affairs Certificate"
    ],
    certifications: [
      "American Medical Writers Association (AMWA)",
      "Regulatory Affairs Professionals Society (RAPS)",
      "International Society for Medical Publication Professionals (ISMPP)"
    ],
    achievements: [
      "Led documentation for successful FDA submissions",
      "Developed protocols for Phase II/III clinical trials",
      "Contributed to successful grant applications totaling millions",
      "Multiple peer-reviewed publications in scientific journals"
    ],
    isActive: true,
    joinDate: "Member since founding",
    isFoundingMember: true
  }
];

export const getActiveMembers = () => teamMembers.filter(member => member.isActive);
export const getFoundingMembers = () => teamMembers.filter(member => member.isFoundingMember);
export const getMemberById = (id: string) => teamMembers.find(member => member.id === id);
