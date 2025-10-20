import {
  Box,
  Flex,
  Heading,
  Link,
  List,
  Stack,
  Text,
  type HeadingProps,
  type LinkProps,
} from '@chakra-ui/react';

import type { Resume } from '@/models/interfaces/resume-data';

const sectionHeadingStyling: HeadingProps = {
  size: 'lg',
  color: 'primary.500',
};

const linkStyling: LinkProps = {
  display: 'inline-flex',
  color: 'primary.500',
  borderBottom: '1px solid',
  borderColor: 'primary.500',
};

export const Template5: React.FC<Resume> = ({
  data: { personal, summary, experience, education, skills },
}) => {
  return (
    <Box p={12}>
      <Flex gap={12} mb={14}>
        <Stack gap={4} w='full'>
          <Heading size='5xl' asChild>
            <h1>{personal.name}</h1>
          </Heading>

          {summary && <Text>{summary}</Text>}
        </Stack>

        <Stack gap={2} w='56' minW='56' whiteSpace='nowrap' alignItems='start'>
          {personal.location && <Text>{personal.location}</Text>}

          {personal.age && <Text>{personal.age}</Text>}

          {personal.phone && (
            <Link fontWeight='bold' href={`tel:${personal.phone}`}>
              {personal.phone}
            </Link>
          )}

          {personal.email && (
            <Link {...linkStyling} href={`mailto:${personal.email}`}>
              {personal.email}
            </Link>
          )}

          {personal.linkedIn && (
            <Link {...linkStyling} href={`mailto:${personal.linkedIn}`}>
              LinkedIn Profile
            </Link>
          )}

          {personal.website && (
            <Link {...linkStyling} href={`mailto:${personal.website}`}>
              Website
            </Link>
          )}
        </Stack>
      </Flex>

      <Flex gap={12}>
        <Stack gap={12}>
          <Stack gap={2} w='full'>
            <Heading {...sectionHeadingStyling}>Experience</Heading>
            <Stack gap={5}>
              {experience.map((section) => (
                <div key={section.companyName + section.jobTitle}>
                  <Heading size='xl'>
                    {section.jobTitle},{' '}
                    <Text asChild fontWeight='normal'>
                      <span>{section.companyName}</span>
                    </Text>
                  </Heading>

                  <Text color='fg.subtle'>{section.date}</Text>

                  <Text mt={2}>{section.description}</Text>
                </div>
              ))}
            </Stack>
          </Stack>

          <Stack gap={2} w='full'>
            <Heading {...sectionHeadingStyling}>Education</Heading>
            <Stack gap={5}>
              {education.map((section) => (
                <div key={section.degree + section.institution}>
                  <Heading size='xl'>
                    {section.degree},{' '}
                    <Text asChild fontWeight='normal'>
                      <span>{section.institution}</span>
                    </Text>
                  </Heading>

                  <Text color='fg.subtle'>{section.date}</Text>
                </div>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Stack gap={4} w='56' minW='56'>
          {!!skills?.length && (
            <Stack gap={2}>
              <Heading {...sectionHeadingStyling}>Skills</Heading>
              <List.Root listStyle='none'>
                {skills.map((skill) => (
                  <List.Item key={skill}>{skill}</List.Item>
                ))}
              </List.Root>
            </Stack>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
