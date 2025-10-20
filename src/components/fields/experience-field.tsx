import { useCallback } from 'react';

import { Button, ButtonGroup, Card, IconButton, Input, Stack, Textarea } from '@chakra-ui/react';
import { useFieldArray, useFormContext, type FieldPath } from 'react-hook-form';
import { MdArrowDownward, MdArrowUpward, MdDelete } from 'react-icons/md';

import type { Resume } from '@/models/interfaces/resume-data';

import { createMockExperienceSection } from '@/utils/create-mock-resume-data';

import { ResumeFormField } from './resume-form-field';

export interface ExperienceFieldProps {
  name: FieldPath<Resume>;
}

export const ExperienceField: React.FC<ExperienceFieldProps> = ({ name }) => {
  const { register } = useFormContext();
  const { fields, prepend, remove, move } = useFieldArray({
    name,
    keyName: 'id',
    rules: { validate: (v) => !!v.length },
  });

  const onAddNewExperience = useCallback(() => {
    prepend(createMockExperienceSection());
  }, []);

  const onRemoveExperience = useCallback((idx: number) => {
    if (confirm('Are you sure you want to remove this experience section?')) {
      remove(idx);
    }
  }, []);

  const onSwapSection = useCallback((idx: number, direction: 'up' | 'down') => {
    move(idx, direction === 'up' ? idx - 1 : idx + 1);
  }, []);

  return (
    <Stack gap={4}>
      <Button onClick={onAddNewExperience}>Add a new Experience section</Button>

      {fields.map((field, idx) => (
        <Card.Root size='sm' key={field.id}>
          <Card.Header key={field.id}>
            <ButtonGroup
              size='xs'
              variant='ghost'
              pos='absolute'
              top={0}
              right={0}
              p={1}
              zIndex={2}
              gap={0}
            >
              <IconButton disabled={idx === 0} onClick={() => onSwapSection(idx, 'up')}>
                <MdArrowUpward />
              </IconButton>

              <IconButton
                disabled={idx === fields.length - 1}
                onClick={() => onSwapSection(idx, 'down')}
              >
                <MdArrowDownward />
              </IconButton>

              <IconButton onClick={() => onRemoveExperience(idx)}>
                <MdDelete />
              </IconButton>
            </ButtonGroup>

            <ResumeFormField label='Job Title' required name={`${name}.${idx}.jobTitle`}>
              <Input {...register(`${name}.${idx}.jobTitle`, { required: true })} />
            </ResumeFormField>

            <ResumeFormField label='Company Name' required name={`${name}.${idx}.companyName`}>
              <Input size='sm' {...register(`${name}.${idx}.companyName`, { required: true })} />
            </ResumeFormField>

            <ResumeFormField label='Date' required name={`${name}.${idx}.date`}>
              <Input size='xs' {...register(`${name}.${idx}.date`, { required: true })} />
            </ResumeFormField>
          </Card.Header>

          <Card.Body>
            <ResumeFormField label='Description' required name={`${name}.${idx}.description`}>
              <Textarea
                size='sm'
                {...register(`${name}.${idx}.description`, { required: true })}
                resize='vertical'
                maxH='60'
                minH='20'
              />
            </ResumeFormField>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};
