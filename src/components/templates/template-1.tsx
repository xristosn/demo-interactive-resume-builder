import {
  Flex,
  Heading,
  Image,
  List,
  Separator,
  Stack,
  Strong,
  Text,
  type HeadingProps,
} from '@chakra-ui/react';
import {
  IoMdMail,
  IoMdLocate,
  IoMdPhonePortrait,
  IoMdGlobe,
  IoMdCalendar,
  IoLogoLinkedin,
} from 'react-icons/io';

import { useColorMode } from '@/components/ui/color-mode';

import type { Resume } from '@/models/interfaces/resume-data';

const sectionHeadingStyling: HeadingProps = {
  size: 'xl',
  color: 'primary.500',
};

export const Template1: React.FC<Resume> = ({
  data: { personal, education, experience, skills, summary },
}) => {
  const { colorMode } = useColorMode();

  const sidebarBgColor = colorMode === 'light' ? 'primary.100' : 'primary.800';

  return (
    <Flex h='full'>
      <Stack gap={8} bgColor={sidebarBgColor} p={12} w='md'>
        {personal.avatar && (
          <Image src={personal.avatar} w='48' objectFit='contain' rounded='full' mx='auto' />
        )}

        <Stack gap={2}>
          <Heading {...sectionHeadingStyling}>Contact</Heading>

          {personal.phone && (
            <Stack asChild gap={4} direction='row' alignItems='center'>
              <a target='_blank' href={`tel:${personal.phone}`}>
                <IoMdPhonePortrait />
                {personal.phone}
              </a>
            </Stack>
          )}

          {personal.email && (
            <Stack asChild gap={4} direction='row' alignItems='center'>
              <a target='_blank' href={`mailto:${personal.email}`}>
                <IoMdMail />
                {personal.email}
              </a>
            </Stack>
          )}

          {personal.location && (
            <Stack gap={4} direction='row' alignItems='center'>
              <IoMdLocate />
              {personal.location}
            </Stack>
          )}

          {personal.website && (
            <Stack asChild gap={4} direction='row' alignItems='center'>
              <a target='_blank' href={personal.website}>
                <IoMdGlobe />
                {personal.website}
              </a>
            </Stack>
          )}

          {personal.linkedIn && (
            <Stack asChild gap={4} direction='row' alignItems='center'>
              <a target='_blank' href={personal.linkedIn}>
                <IoLogoLinkedin />
                {personal.linkedIn}
              </a>
            </Stack>
          )}

          {personal.age && (
            <Stack gap={4} direction='row' alignItems='center'>
              <IoMdCalendar />
              {personal.age}
            </Stack>
          )}
        </Stack>

        {!!skills?.length && (
          <Stack gap={2}>
            <Heading {...sectionHeadingStyling}>Skills</Heading>

            <List.Root pl={4}>
              {skills.map((skill) => (
                <List.Item key={skill}>{skill}</List.Item>
              ))}
            </List.Root>
          </Stack>
        )}
      </Stack>

      <Stack gap={8} w='full' p={12}>
        <Stack gap={2}>
          <Heading size='2xl' asChild textAlign='center'>
            <h1>{personal.name}</h1>
          </Heading>

          <Heading size='md' textAlign='center' color='primary.500'>
            {personal.jobTitle}
          </Heading>
        </Stack>

        {summary && <Text textAlign='center'>{summary}</Text>}

        <Separator borderColor={sidebarBgColor} borderTopWidth={2} />

        <Stack gap={6}>
          <Heading {...sectionHeadingStyling}>Experience</Heading>

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
            <Heading {...sectionHeadingStyling}>Education</Heading>

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
    </Flex>
  );
};
