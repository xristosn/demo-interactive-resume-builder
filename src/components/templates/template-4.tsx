import {
  Box,
  Flex,
  Heading,
  List,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  type HeadingProps,
} from '@chakra-ui/react';

import type { Resume } from '@/models/interfaces/resume-data';

const sectionHeadingStyling: HeadingProps = {
  fontStyle: 'italic',
  fontWeight: 'normal',
  size: 'md',
  mb: 2,
};

export const Template4: React.FC<Resume> = ({
  data: { personal, summary, experience, education, skills },
}) => {
  return (
    <Stack gap={4} py={4} px={12}>
      <Box h='4' bg='primary.400' />

      <Flex justify='space-between' align='start' mb={6}>
        <Stack gap={1}>
          <Heading size='3xl' fontWeight='bold' letterSpacing='wide'>
            {personal.name}
          </Heading>

          <Text fontStyle='italic'>{personal.jobTitle}</Text>
        </Stack>

        <Stack gap={0.5} align='end' fontSize='sm'>
          {personal.phone && <a href={`tel:${personal.phone}`}>{personal.phone}</a>}

          {personal.email && <a href={`tel:${personal.email}`}>{personal.email}</a>}

          {personal.location && <Text>{personal.location}</Text>}

          {personal.age && <Text>{personal.age}</Text>}
        </Stack>
      </Flex>

      {summary && (
        <>
          <Stack direction='row' gap={2}>
            <Box w='40'>
              <Heading {...sectionHeadingStyling}>Profile</Heading>
            </Box>

            <Text fontSize='sm' lineHeight='1.8' textAlign='justify' w='full'>
              {summary}
            </Text>
          </Stack>
        </>
      )}

      {!!skills?.length && (
        <>
          <Separator variant='dotted' size='md' />

          <Stack direction='row' gap={2}>
            <Box w='40'>
              <Heading {...sectionHeadingStyling}>Skills</Heading>
            </Box>

            <SimpleGrid columns={3} gap={4} w='full' asChild>
              <List.Root listStylePosition='inside'>
                {skills.map((skill) => (
                  <List.Item key={skill}>{skill}</List.Item>
                ))}
              </List.Root>
            </SimpleGrid>
          </Stack>
        </>
      )}

      <Separator variant='dotted' size='md' />

      <Stack direction='row' gap={2}>
        <Box w='40'>
          <Heading {...sectionHeadingStyling}>Experience</Heading>
        </Box>

        <Stack gap={6} w='full'>
          {experience.map((exp, idx) => (
            <Box key={idx}>
              <Flex justify='space-between' align='start' mb={2}>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    {exp.companyName}
                  </Text>
                  <Text fontSize='sm' color='fg.muted'>
                    {exp.jobTitle}
                  </Text>
                </Box>
                <Text fontSize='sm' whiteSpace='nowrap'>
                  {exp.date}
                </Text>
              </Flex>
              <Text fontSize='sm' lineHeight='1.8' textAlign='justify'>
                {exp.description}
              </Text>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Separator variant='dotted' size='md' />

      <Stack direction='row' gap={2}>
        <Box w='40'>
          <Heading {...sectionHeadingStyling}>Education</Heading>
        </Box>

        <Stack gap={6} w='full'>
          {education.map((edu, idx) => (
            <Box key={idx}>
              <Flex justify='space-between' align='start'>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    {edu.institution}
                  </Text>
                  <Text fontSize='sm'>{edu.degree}</Text>
                </Box>
                <Text fontSize='sm' whiteSpace='nowrap'>
                  {edu.date}
                </Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Box h='2' bg='primary.500' />

      <Stack gap={2}>
        <Flex justify='space-between' fontSize='xs' color='gray.400'>
          <Text>{personal.name}</Text>

          {personal.phone && <a href={`tel:${personal.phone}`}>{personal.phone}</a>}

          {personal.email && <a href={`tel:${personal.email}`}>{personal.email}</a>}
        </Flex>

        <Flex justify='space-between' fontSize='xs' color='gray.400'>
          {personal.website && <a href={personal.website}>{personal.website}</a>}

          {personal.linkedIn && <a href={personal.linkedIn}>{personal.linkedIn}</a>}
        </Flex>
      </Stack>
    </Stack>
  );
};
