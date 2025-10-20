import { useMemo, useState } from 'react';

import { useFormContext, type FieldPath } from 'react-hook-form';
import {
  Button,
  ButtonGroup,
  DownloadTrigger,
  Heading,
  IconButton,
  Input,
  Stack,
  Steps,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { SiJson } from 'react-icons/si';
import { FaFilePdf } from 'react-icons/fa6';
import { get } from 'lodash-es';

import type { Resume } from '@/models/interfaces/resume-data';
import { SAMPLE_COLORS } from '@/models/constants/sample-colors';

import { printPDF } from '@/utils/print-to-pdf';

import { ResumeFormField } from './fields/resume-form-field';
import { AvatarField } from './fields/avatar-field';
import { ExperienceField } from './fields/experience-field';
import { SkillsField } from './fields/skills-field';
import { EducationField } from './fields/education-field';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { ColorField } from './fields/color-field';
import { ThemeField } from './fields/theme-field';

const STEPS: { label: string; fields: FieldPath<Resume>[] }[] = [
  {
    label: 'Personal',
    fields: [
      'data.personal.avatar',
      'data.personal.name',
      'data.personal.jobTitle',
      'data.personal.email',
      'data.personal.phone',
      'data.personal.website',
      'data.personal.linkedIn',
      'data.personal.location',
      'data.personal.age',
    ],
  },
  { label: 'Summary', fields: ['data.summary'] },
  { label: 'Experience', fields: ['data.experience'] },
  { label: 'Skills', fields: ['data.skills'] },
  { label: 'Education', fields: ['data.education'] },
  { label: 'Theme', fields: ['primaryPaletteBase', 'theme'] },
  { label: 'Export', fields: ['data'] },
];

export const ResumeForm: React.FC = () => {
  const { register, formState, getValues } = useFormContext<Resume>();
  const [step, setStep] = useState(0);
  const currentStepErrors = useMemo(() => {
    const fields = STEPS[step].fields;
    return fields.map((name) => get(formState.errors, name)).filter(Boolean);
  }, [step, formState.isValid]);
  const isStepValid = !currentStepErrors.length;

  const { stringifiedData, fileName } = useMemo(() => {
    const values = getValues();

    return {
      stringifiedData: JSON.stringify(values, null, 4),
      fileName: `${values.data?.personal?.name?.split(' ').join('_')}_Resume`,
    };
  }, [step]);

  return (
    <Steps.Root
      size='xs'
      orientation='vertical'
      count={STEPS.length}
      step={step}
      onStepChange={(s) => setStep(s.step)}
      linear
    >
      <Stack gap={4} h='full'>
        <Steps.List py={4} pl={4} flexWrap='wrap' h='full'>
          {STEPS.map((step, idx) => (
            <Steps.Item key={step.label} index={idx}>
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Title>{step.label}</Steps.Title>
              </Steps.Trigger>

              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        <ButtonGroup
          size='xs'
          variant='outline'
          rounded='full'
          justifyContent='center'
          alignItems='center'
          pb={2}
          px={0}
          w='full'
        >
          <Steps.PrevTrigger asChild>
            <IconButton rounded='full'>
              <MdArrowLeft />
            </IconButton>
          </Steps.PrevTrigger>

          <Text fontSize='xs' color='fg.muted'>
            {step + 1} / {STEPS.length}
          </Text>

          <Steps.NextTrigger asChild disabled={!isStepValid || step == STEPS.length - 1}>
            <IconButton rounded='full'>
              <MdArrowRight />
            </IconButton>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Stack>

      <Stack gap={8} w='full' overflow='auto' py={4} px={4}>
        <Steps.Content index={0}>
          <Stack gap={6}>
            <ResumeFormField label='Avatar' name='data.personal.avatar'>
              <AvatarField name='data.personal.avatar' />
            </ResumeFormField>

            <ResumeFormField label='Full Name' name='data.personal.name' required>
              <Input {...register('data.personal.name', { required: true, minLength: 3 })} />
            </ResumeFormField>

            <ResumeFormField label='Job Title' name='data.personal.jobTitle' required>
              <Input {...register('data.personal.jobTitle', { required: true, minLength: 3 })} />
            </ResumeFormField>

            <ResumeFormField label='Email' name='data.personal.email' required>
              <Input
                type='email'
                {...register('data.personal.email', {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </ResumeFormField>

            <ResumeFormField label='Phone' name='data.personal.phone'>
              <Input type='tel' {...register('data.personal.phone')} />
            </ResumeFormField>

            <ResumeFormField label='Website URL' name='data.personal.website'>
              <Input
                type='url'
                {...register('data.personal.website', {
                  pattern:
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                })}
              />
            </ResumeFormField>

            <ResumeFormField label='LinkedIn URL' name='data.personal.linkedIn'>
              <Input
                type='url'
                {...register('data.personal.linkedIn', {
                  pattern:
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                })}
              />
            </ResumeFormField>

            <ResumeFormField label='Location' name='data.personal.location'>
              <Input type='text' {...register('data.personal.location')} />
            </ResumeFormField>

            <ResumeFormField label='Age' name='data.personal.age'>
              <Input type='text' {...register('data.personal.age')} />
            </ResumeFormField>
          </Stack>
        </Steps.Content>

        <Steps.Content index={1}>
          <ResumeFormField label='Summary' name='data.summary'>
            <Textarea
              resize='vertical'
              maxH='90vh'
              minH='xs'
              h='sm'
              {...register('data.summary')}
            />
          </ResumeFormField>
        </Steps.Content>

        <Steps.Content index={2}>
          <ExperienceField name='data.experience' />
        </Steps.Content>

        <Steps.Content index={3}>
          <SkillsField name='data.skills' />
        </Steps.Content>

        <Steps.Content index={4}>
          <EducationField name='data.education' />
        </Steps.Content>

        <Steps.Content index={5}>
          <Stack gap={4}>
            <ResumeFormField required label='Theme' defaultEmptyValue='light' name='theme'>
              <ThemeField name='theme' />
            </ResumeFormField>

            <ResumeFormField
              required
              label='Theme Color'
              defaultEmptyValue={SAMPLE_COLORS[0]?.color}
              name='primaryPaletteBase'
            >
              <ColorField name='primaryPaletteBase' />
            </ResumeFormField>
          </Stack>
        </Steps.Content>

        <Steps.Content index={6}>
          <Heading textAlign='center' mb={4}>
            Export to
          </Heading>
          <ButtonGroup variant='outline' size='lg' justifyContent='space-between' w='full'>
            <DownloadTrigger
              asChild
              data={stringifiedData}
              fileName={`${fileName}.json`}
              mimeType='application/json'
            >
              <Button colorPalette='orange'>
                <SiJson />
                JSON
              </Button>
            </DownloadTrigger>

            <Button colorPalette='red' onClick={() => printPDF(fileName)}>
              <FaFilePdf />
              PDF
            </Button>
          </ButtonGroup>
        </Steps.Content>

        <ButtonGroup size='sm' variant='outline' justifyContent='space-between'>
          <Steps.PrevTrigger asChild>
            <Button>Previous</Button>
          </Steps.PrevTrigger>

          <Steps.NextTrigger asChild disabled={!isStepValid || step == STEPS.length - 1}>
            <Button>Next</Button>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Stack>
    </Steps.Root>
  );
};
