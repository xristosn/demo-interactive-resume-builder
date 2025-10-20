import { useCallback } from 'react';

import { Button, ButtonGroup, Card, IconButton, Input, Stack } from '@chakra-ui/react';
import { useFieldArray, useFormContext, type FieldPath } from 'react-hook-form';
import { MdArrowDownward, MdArrowUpward, MdDelete } from 'react-icons/md';

import type { Resume } from '@/models/interfaces/resume-data';

import { createMockEducationSection } from '@/utils/create-mock-resume-data';

import { ResumeFormField } from './resume-form-field';

export interface EducationFieldProps {
  name: FieldPath<Resume>;
}

export const EducationField: React.FC<EducationFieldProps> = ({ name }) => {
  const { register } = useFormContext();
  const { fields, prepend, remove, move } = useFieldArray({
    name,
    keyName: 'id',
    rules: { validate: (v) => !!v.length },
  });

  const onAddNewEducation = useCallback(() => {
    prepend(createMockEducationSection());
  }, []);

  const onRemoveEducation = useCallback((idx: number) => {
    if (confirm('Are you sure you want to remove this education section?')) {
      remove(idx);
    }
  }, []);

  const onSwapSection = useCallback((idx: number, direction: 'up' | 'down') => {
    move(idx, direction === 'up' ? idx - 1 : idx + 1);
  }, []);

  return (
    <Stack gap={4}>
      <Button onClick={onAddNewEducation}>Add a new Education section</Button>

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

              <IconButton onClick={() => onRemoveEducation(idx)}>
                <MdDelete />
              </IconButton>
            </ButtonGroup>

            <ResumeFormField label='Degree' required name={`${name}.${idx}.degree`}>
              <Input {...register(`${name}.${idx}.degree`, { required: true })} />
            </ResumeFormField>
          </Card.Header>

          <Card.Body gap={2}>
            <ResumeFormField label='Institution' required name={`${name}.${idx}.institution`}>
              <Input size='sm' {...register(`${name}.${idx}.institution`, { required: true })} />
            </ResumeFormField>

            <ResumeFormField label='Date' required name={`${name}.${idx}.date`}>
              <Input size='xs' {...register(`${name}.${idx}.date`, { required: true })} />
            </ResumeFormField>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};
