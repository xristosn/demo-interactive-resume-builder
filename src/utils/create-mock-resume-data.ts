import { faker } from '@faker-js/faker';

import type {
  EducationSection,
  ExperienceSection,
  ResumeData,
} from '@/models/interfaces/resume-data';

export function createMockResumeData(): ResumeData {
  return {
    personal: {
      name: faker.person.fullName(),
      jobTitle: faker.person.jobTitle(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: `https://${faker.internet.domainName()}`,
      age: `${getAge(faker.date.birthdate())} years old`,
      location: `${faker.location.city()}, ${faker.location.country()}`,
      linkedIn: `https://linkedin.com/in/${faker.internet.displayName()}`,
      avatar: '/avatar.png',
    },

    summary: faker.lorem.lines({ min: 6, max: 9 }),

    experience: Array.from({ length: randomNumberFromRange(3, 7) }, (_, idx) =>
      createMockExperienceSection(idx)
    ),

    education: Array.from({ length: randomNumberFromRange(2, 5) }, () =>
      createMockEducationSection()
    ),

    skills: Array.from({ length: randomNumberFromRange(5, 25) }, () => faker.lorem.word()),
  };
}

export function createMockExperienceSection(_idx = NaN): ExperienceSection {
  const start = faker.date.past();
  const end = _idx === 0 ? '' : faker.date.soon({ refDate: start });

  return {
    companyName: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    description: faker.lorem.lines({ min: 3, max: 15 }),
    date: `${start.getMonth() + 1}/${start.getFullYear()} - ${
      end ? `${end.getMonth() + 1}/${end.getFullYear()}` : 'Currently'
    }`,
  };
}

export function createMockEducationSection(): EducationSection {
  return {
    degree: faker.lorem.words({ min: 2, max: 5 }),
    institution: faker.lorem.words({ min: 2, max: 5 }),
    date: `${faker.date.past().getMonth() + 1}/${faker.date.past().getFullYear()}`,
  };
}

function randomNumberFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getAge(refDate: Date) {
  const diff = new Date().getTime() - refDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
