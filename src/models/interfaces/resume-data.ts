export interface Resume {
  primaryPaletteBase: string;
  theme: 'light' | 'dark';
  templateId: string;

  data: ResumeData;
}

export interface ResumeData {
  personal: {
    name: string;
    avatar?: string;
    jobTitle: string;
    email: string;
    location?: string;
    age?: string;
    phone?: string;
    website?: string;
    linkedIn?: string;
  };

  summary?: string;

  experience: ExperienceSection[];

  education: EducationSection[];

  skills?: string[];
}

export interface ExperienceSection {
  companyName: string;
  jobTitle: string;
  date: string;
  description: string;
}

export interface EducationSection {
  institution: string;
  degree: string;
  date: string;
}
