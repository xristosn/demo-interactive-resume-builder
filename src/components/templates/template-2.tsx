import {
  Flex,
  Heading,
  Image,
  List,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  type HeadingProps,
} from '@chakra-ui/react';

import { useColorMode } from '@/components/ui/color-mode';

import type { Resume } from '@/models/interfaces/resume-data';

const sectionHeadingStyling: HeadingProps = {
  textTransform: 'uppercase',
  fontWeight: 'bold',
  size: 'lg',
  pb: 1,
  borderBottom: '2px solid',
  borderColor: 'primary.50',
};

export const Template2: React.FC<Resume> = ({
  data: { personal, summary, experience, education, skills },
}) => {
  const { colorMode } = useColorMode();

  const headerBgColor = colorMode === 'light' ? 'primary.50' : 'primary.700';

  return (
    <div>
      <Flex p={8} bgColor={headerBgColor} w='full' gap={4}>
        <Stack gap={4}>
          {personal.avatar && (
            <div>
              <Flex display='inline-flex' rounded='full' p={2} bgColor='bg'>
                <Image w='24' rounded='full' src={personal.avatar} />
              </Flex>
            </div>
          )}

          <Heading size='3xl' asChild>
            <h1>{personal.name}</h1>
          </Heading>

          <Heading size='lg'>{personal.jobTitle}</Heading>
        </Stack>

        <SimpleGrid columns={2} gap={6} fontSize='sm' ml='auto' alignContent='start'>
          {personal.email && (
            <Stack gap={1}>
              <Text color='fg.muted'>Email:</Text>
              <a target='_blank' href={`mailto:${personal.email}`}>
                {personal.email}
              </a>
            </Stack>
          )}

          {personal.phone && (
            <Stack gap={1}>
              <Text color='fg.muted'>Phone:</Text>
              <a target='_blank' href={`tel:${personal.phone}`}>
                {personal.phone}
              </a>
            </Stack>
          )}

          {personal.location && (
            <Stack gap={1}>
              <Text color='fg.muted'>Location:</Text>
              <Text>{personal.location}</Text>
            </Stack>
          )}
          {personal.website && (
            <Stack gap={1}>
              <Text color='fg.muted'>Website:</Text>
              <a target='_blank' href={personal.website}>
                {personal.website}
              </a>
            </Stack>
          )}

          {personal.linkedIn && (
            <Stack gap={1}>
              <Text color='fg.muted'>LinkedIn:</Text>
              <a target='_blank' href={personal.linkedIn}>
                {personal.linkedIn}
              </a>
            </Stack>
          )}
        </SimpleGrid>
      </Flex>

      <Flex p={8} gap={4}>
        <Stack gap={4} w='full'>
          {summary && (
            <Stack gap={2}>
              <Heading {...sectionHeadingStyling} borderColor={headerBgColor}>
                Bio
              </Heading>
              <Text>{summary}</Text>
            </Stack>
          )}

          <Stack gap={6}>
            <Heading {...sectionHeadingStyling} borderColor={headerBgColor}>
              Experience
            </Heading>

            {experience.map((section) => (
              <Stack gap={2} key={section.companyName + section.jobTitle}>
                <Heading>{section.jobTitle}</Heading>
                <Heading size='sm'>
                  {section.companyName} ({section.date})
                </Heading>

                <Text>{section.description}</Text>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Separator orientation='vertical' borderColor={headerBgColor} size='md' />

        <Stack gap={4} w='sm'>
          <Stack gap={2}>
            <Heading {...sectionHeadingStyling} borderColor={headerBgColor}>
              Education
            </Heading>

            <Stack gap={6}>
              {education.map((section) => (
                <Stack gap={2} key={section.degree + section.institution}>
                  <Heading>{section.degree}</Heading>
                  <Heading size='sm' fontWeight='normal'>
                    {section.institution} ({section.date})
                  </Heading>
                </Stack>
              ))}
            </Stack>
          </Stack>

          {!!skills?.length && (
            <Stack gap={2}>
              <Heading {...sectionHeadingStyling} borderColor={headerBgColor}>
                Skills
              </Heading>

              <List.Root listStyle='none'>
                {skills.map((skill) => (
                  <List.Item key={skill}>{skill}</List.Item>
                ))}
              </List.Root>
            </Stack>
          )}
        </Stack>
      </Flex>
    </div>
  );
};
