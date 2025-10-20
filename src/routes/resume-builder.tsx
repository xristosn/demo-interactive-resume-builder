import { useMemo } from 'react';

import { Box, Container, Flex, defaultSystem } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';

import { ResumeForm } from '@/components/resume-form';

import { A4_DIMENSIONS } from '@/models/constants/paper-dimensions';
import { SAMPLE_COLORS } from '@/models/constants/sample-colors';
import type { Resume } from '@/models/interfaces/resume-data';
import { createMockResumeData } from '@/utils/create-mock-resume-data';

import { TemplatePreview } from './template-preview';

export const CreateResume: React.FC = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();

  const originalResumeData: Resume = useMemo(
    () =>
      state?.resume
        ? { ...state.resume, templateId: searchParams.get('templateId') }
        : ({
            primaryPaletteBase: SAMPLE_COLORS[0]?.color,
            theme: searchParams.get('templateId'),
            data: createMockResumeData(),
          } as Resume),
    [state?.resume, searchParams.get('templateId')]
  );

  const formMethods = useForm<Resume>({
    defaultValues: originalResumeData,
    mode: 'onBlur',
  });
  const resume = formMethods.watch();

  return (
    <Flex
      overflowY='hidden'
      overflowX='auto'
      justifyContent='space-between'
      alignItems='center'
      minW={`calc(${defaultSystem.token('sizes.md')} + ${A4_DIMENSIONS.width}px)`}
      bgColor='bg.subtle'
    >
      <Box minW='md' minH='100vh' />
      <Box w='md' h='100vh' shadow='sm' pos='fixed' top={0} left={0} zIndex='docked' bgColor="bg">
        <FormProvider {...formMethods}>
          <ResumeForm />
        </FormProvider>
      </Box>

      <Container maxW={A4_DIMENSIONS.width} overflow='auto' p={0} my={4} shadow='md' bgColor='bg'>
        <TemplatePreview resume={resume} />
      </Container>
    </Flex>
  );
};
