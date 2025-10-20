import { Flex, Heading, Image, Link, List, Separator, Stack, Strong, Text } from '@chakra-ui/react';

import { useColorMode } from '@/components/ui/color-mode';

import type { Resume } from '@/models/interfaces/resume-data';

export const Template6: React.FC<Resume> = ({
  data: { personal, education, experience, skills, summary },
}) => {
  const { colorMode } = useColorMode();

  const sidebarColor = colorMode === 'light' ? 'bg' : 'bg.inverted';
  const separatorColor = colorMode === 'light' ? 'primary.100' : 'primary.800'
  const headingColor = colorMode === 'light' ? 'primary.900' : 'primary.400'

  return (
    <Flex h='full'>
      <Stack gap={12} w='full' p={12}>
        {summary && <Text>{summary}</Text>}

        <Separator borderColor={separatorColor} borderTopWidth={2} />

        <Stack gap={6}>
          <Heading size='2xl' color={headingColor}>
            Experience
          </Heading>

          {experience.map(({ companyName, description, jobTitle, date }) => (
            <Stack gap={1} key={companyName + jobTitle}>
              <Heading size='md' fontWeight='normal'>
                <Strong>{jobTitle}</Strong>, {companyName}
              </Heading>

              <Text fontSize='sm' color='fg.muted'>
                {date}
              </Text>

              <Text>{description}</Text>
            </Stack>
          ))}
        </Stack>

        {!!education?.length && (
          <Stack gap={6}>
            <Heading size='2xl' color={headingColor}>
              Education
            </Heading>

            {education.map(({ degree, institution, date }) => (
              <Stack gap={1} key={degree + institution + date}>
                <div>
                  <Heading size='md'>
                    <Strong>{degree}</Strong>
                  </Heading>
                  <Heading size='sm' fontWeight='normal'>
                    {institution}
                  </Heading>
                </div>

                <Text fontSize='sm' color='fg.muted'>
                  {date}
                </Text>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      <Stack gap={4} bgColor='primary.800' py={8} w='sm' color={sidebarColor}>
        <Stack gap={2} px={12}>
          <Heading size='2xl' asChild textAlign='center'>
            <h1>{personal.name}</h1>
          </Heading>

          <Heading size='md' textAlign='center' color='primary.200'>
            {personal.jobTitle}
          </Heading>
        </Stack>

        {personal.avatar && (
          <Image
            src={personal.avatar}
            w='48'
            objectFit='contain'
            rounded='md'
            mx='auto'
            shadow='xs'
          />
        )}

        <Stack gap={2}>
          <Heading size='xl' px={12} py={2} bgColor='primary.900'>
            Contact
          </Heading>

          <Stack gap={2} px={12} fontSize='sm'>
            {personal.phone && (
              <Stack gap={1}>
                <Text>Phone</Text>

                <Link color='whiteAlpha.700' target='_blank' href={`tel:${personal.phone}`}>
                  {personal.phone}
                </Link>
              </Stack>
            )}

            {personal.email && (
              <Stack gap={1}>
                <Text>Email</Text>

                <Link color='whiteAlpha.700' target='_blank' href={`mailto:${personal.email}`}>
                  {personal.email}
                </Link>
              </Stack>
            )}

            {personal.location && (
              <Stack gap={1}>
                <Text>Location</Text>

                <Text color='whiteAlpha.700'>{personal.location}</Text>
              </Stack>
            )}

            {personal.website && (
              <Stack gap={1}>
                <Text>Website</Text>

                <Link color='whiteAlpha.700' target='_blank' href={personal.website}>
                  {personal.website}
                </Link>
              </Stack>
            )}

            {personal.linkedIn && (
              <Stack gap={1}>
                <Text>LinkedIn</Text>

                <Link color='whiteAlpha.700' target='_blank' href={personal.linkedIn}>
                  {personal.linkedIn}
                </Link>
              </Stack>
            )}

            {personal.age && (
              <Stack gap={1}>
                <Text>Age</Text>

                <Text color='whiteAlpha.700'>{personal.age}</Text>
              </Stack>
            )}
          </Stack>
        </Stack>

        {!!skills?.length && (
          <Stack gap={2}>
            <Heading size='xl' px={12} py={2} bgColor='primary.900'>
              Skills
            </Heading>

            <List.Root listStyle='none' color='whiteAlpha.700' gap={1} px={12} fontSize='sm'>
              {skills.map((skill) => (
                <List.Item key={skill}>{skill}</List.Item>
              ))}
            </List.Root>
          </Stack>
        )}
      </Stack>
    </Flex>
  );
};
