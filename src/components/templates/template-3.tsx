import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Image,
  Stack,
  Heading,
  SimpleGrid,
  Icon,
  type HeadingProps,
  Badge,
} from '@chakra-ui/react';
import {
  FaLocationDot,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLinkedin,
  FaCalendar,
} from 'react-icons/fa6';

import { useColorMode } from '@/components/ui/color-mode';

import type { Resume } from '@/models/interfaces/resume-data';

const sectionHeadingStyling: HeadingProps = {
  textTransform: 'uppercase',
  size: 'lg',
  letterSpacing: 'wide',
};

export const Template3: React.FC<Resume> = ({
  data: { personal, education, experience, skills, summary },
}) => {
  const { colorMode } = useColorMode();

  const headerBgColor = colorMode === 'light' ? 'primary.50' : 'primary.900';
  const sidebarBgColor = colorMode === 'light' ? 'primary.900' : 'primary.200';
  const sidebarColor = colorMode === 'light' ? 'primary.50' : 'primary.900';

  return (
    <Box h='full'>
      <Box h='50px' w='sm' bgColor={sidebarBgColor} boxShadow='xs' />

      <Flex
        bgColor={headerBgColor}
        color='bg.inverted'
        justifyContent={personal.avatar ? 'start' : 'center'}
      >
        {personal.avatar && (
          <Flex w='sm' justifyContent='center' alignItems='center' p={4}>
            <Image src={personal.avatar} rounded='full' objectFit='contain' maxW='100%' w='40' />
          </Flex>
        )}

        <Stack p={8} gap={4}>
          <Stack gap={2}>
            <Heading size='3xl' asChild>
              <h1>{personal.name}</h1>
            </Heading>

            <Heading fontWeight='semibold' letterSpacing='wide'>
              {personal.jobTitle}
            </Heading>
          </Stack>

          <SimpleGrid columns={3} gap={6} fontSize='xs'>
            {personal.location && (
              <HStack gap={2}>
                <Icon as={FaLocationDot} boxSize={3} />
                <Text>{personal.location}</Text>
              </HStack>
            )}

            {personal.email && (
              <HStack gap={2} asChild>
                <a href={`mailto:${personal.email}`}>
                  <Icon as={FaEnvelope} boxSize={3} />
                  <Text>{personal.email}</Text>
                </a>
              </HStack>
            )}

            {personal.phone && (
              <HStack gap={2} asChild>
                <a href={`tel:${personal.phone}`}>
                  <Icon as={FaPhone} boxSize={3} />
                  <Text>{personal.phone}</Text>
                </a>
              </HStack>
            )}

            {personal.website && (
              <HStack gap={2} asChild>
                <a href={personal.website}>
                  <Icon as={FaGlobe} boxSize={3} />
                  <Text>{personal.website}</Text>
                </a>
              </HStack>
            )}

            {personal.linkedIn && (
              <HStack gap={2} asChild>
                <a href={personal.linkedIn}>
                  <Icon as={FaLinkedin} boxSize={3} />
                  <Text>{personal.linkedIn}</Text>
                </a>
              </HStack>
            )}

            {personal.age && (
              <HStack gap={2}>
                <Icon as={FaCalendar} boxSize={3} />
                <Text>{personal.age}</Text>
              </HStack>
            )}
          </SimpleGrid>
        </Stack>
      </Flex>

      <Flex>
        <Stack w='sm' bg={sidebarBgColor} color={sidebarColor} p={8} boxShadow='xs' gap={4}>
          {summary && (
            <Stack gap={2}>
              <Heading {...sectionHeadingStyling}>Career Objective</Heading>

              <Text fontSize='sm' lineHeight='1.7'>
                {summary}
              </Text>
            </Stack>
          )}

          <Stack gap={2}>
            <Heading {...sectionHeadingStyling}>Education</Heading>

            <VStack align='stretch' gap={4}>
              {education.map((edu, idx) => (
                <Box key={idx}>
                  <Text fontSize='sm' fontWeight='semibold' mb={1}>
                    {edu.degree}
                  </Text>
                  <Text fontSize='sm'>{edu.institution}</Text>
                  <Text fontSize='sm' color='fg.subtle'>
                    {edu.date}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Stack>
        </Stack>

        <Stack gap={4} flex='1' p={8}>
          <Stack gap={2}>
            <Heading {...sectionHeadingStyling}>Experience</Heading>

            <VStack align='stretch' gap={4}>
              {experience.map((exp) => (
                <Box key={exp.companyName + exp.jobTitle}>
                  <Text fontSize='sm' fontWeight='bold'>
                    {exp.jobTitle}
                  </Text>
                  <Text fontSize='sm' fontWeight='semibold' color='fg.muted'>
                    {exp.companyName}
                  </Text>
                  <Text fontSize='xs' color='fg.subtle' mb={2}>
                    {exp.date}
                  </Text>
                  <Text fontSize='sm' lineHeight='1.7'>
                    {exp.description}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Stack>

          {!!skills?.length && (
            <Stack gap={2}>
              <Heading {...sectionHeadingStyling}>Professional Qualifications</Heading>

              <Flex gap={2} w='md' flexWrap='wrap'>
                {skills.map((skill) => (
                  <Badge key={skill} size='md'>
                    {skill}
                  </Badge>
                ))}
              </Flex>
            </Stack>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
