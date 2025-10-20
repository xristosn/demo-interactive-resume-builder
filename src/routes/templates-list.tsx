import { useCallback, useEffect, useState } from 'react';

import {
  Button,
  ButtonGroup,
  Container,
  FileUpload,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  type FileUploadFileAcceptDetails,
} from '@chakra-ui/react';
import { MdFileUpload } from 'react-icons/md';
import { IoRefresh } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';

import { useColorMode } from '@/components/ui/color-mode';

import { TEMPLATES_CONFIG } from '@/models/constants/templates-config';
import { SAMPLE_COLORS } from '@/models/constants/sample-colors';
import type { Resume } from '@/models/interfaces/resume-data';
import { A4_DIMENSIONS } from '@/models/constants/paper-dimensions';

import { ResponsiveIframe } from '@/components/responsive-iframe';
import { SampleColorPicker } from '@/components/sample-color-picker';
import { Tooltip } from '@/components/ui/tooltip';

import { createMockResumeData } from '@/utils/create-mock-resume-data';

export const TemplatesList: React.FC = () => {
  const { colorMode } = useColorMode();
  const [resume, setResume] = useState<Resume>({
    theme: colorMode || 'light',
    primaryPaletteBase: SAMPLE_COLORS[0].color,
    data: createMockResumeData(),
    templateId: '1',
  });
  const navigate = useNavigate();
  const [focusedTemplate, setFocusedTemplate] = useState('');

  const onRandomizeData = useCallback(() => {
    setResume((p) => ({ ...p, data: createMockResumeData() }));
  }, []);

  const onAcceptFiles = useCallback(async (e: FileUploadFileAcceptDetails) => {
    const file = e.files?.[0];

    if (!file) return;

    try {
      const data = JSON.parse(await file.text()) as Resume;
      navigate(`/builder?templateId=${data.templateId}`, { state: { resume: data } });
    } catch {}
  }, []);

  useEffect(() => {
    setResume((p) => ({ ...p, theme: colorMode || 'light' }));
  }, [colorMode]);

  return (
    <Container pt={12} pb={24}>
      <Stack gap={8}>
        <Stack gap={2}>
          <Heading size='xl' textAlign='center'>
            Choose a template to get started
          </Heading>
        </Stack>

        <ButtonGroup pos='absolute' top={4} right={4} variant='solid'>
          <Tooltip content='Randomize data'>
            <IconButton onClick={onRandomizeData}>
              <IoRefresh />
            </IconButton>
          </Tooltip>

          <FileUpload.Root accept='application/json' maxFiles={1} onFileAccept={onAcceptFiles}>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button>
                <MdFileUpload />
                Import Resume
              </Button>
            </FileUpload.Trigger>
          </FileUpload.Root>
        </ButtonGroup>

        <SimpleGrid columns={2} gap={{ base: 6, md: 8, lg: 10, '2xl': 12 }}>
          {TEMPLATES_CONFIG.map((config) => (
            <Flex
              key={config.id}
              pos='relative'
              shadow='md'
              w='full'
              minH={{ base: 'md', xl: 'lg', '2xl': 'xl' }}
              rounded='sm'
              _hover={{ shadow: 'lg' }}
              transition='box-shadow 250ms ease'
              overflow='hidden'
            >
              <Flex
                pos='absolute'
                top={0}
                left={0}
                w='full'
                h='full'
                bgColor='blackAlpha.500'
                zIndex='2'
                opacity={0}
                _hover={{ opacity: 1 }}
                transition='opacity 250ms ease'
                justifyContent='center'
                alignItems='center'
                gap={4}
              >
                <Button colorPalette='fg' onClick={() => setFocusedTemplate(config.id)}>
                  Preview
                </Button>

                <Button asChild colorPalette='blue'>
                  <Link
                    to={`/builder?templateId=${config.id}`}
                    state={{ resume: { ...resume, templateId: config.id } }}
                  >
                    Select
                  </Link>
                </Button>
              </Flex>

              <ResponsiveIframe
                width={A4_DIMENSIONS.width}
                templateId={config.id}
                resume={resume}
                isFocused={focusedTemplate === config.id}
                onBlur={() => setFocusedTemplate('')}
              />
            </Flex>
          ))}
        </SimpleGrid>

        <SampleColorPicker
          activeColor={resume.primaryPaletteBase}
          setActiveColor={(c) => setResume((p) => ({ ...p, primaryPaletteBase: c }))}
        />
      </Stack>
    </Container>
  );
};
