import { useCallback } from 'react';

import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  List,
  Stack,
} from '@chakra-ui/react';
import { useFieldArray, useForm, useFormContext, useWatch, type FieldPath } from 'react-hook-form';
import { MdAdd, MdArrowDownward, MdArrowUpward, MdDelete } from 'react-icons/md';

import type { Resume } from '@/models/interfaces/resume-data';

import { ResumeFormField } from './resume-form-field';

export interface SkillsFieldProps {
  name: FieldPath<Resume>;
}

export const SkillsField: React.FC<SkillsFieldProps> = ({ name }) => {
  const { register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({ name, keyName: 'id' });
  const {
    register: registerSkillFormField,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { value: '' },
  });
  const skills = useWatch({ name });

  const onAddSkill = useCallback((value: string) => {
    append(value);
  }, []);

  const onRemoveSkill = useCallback((idx: number) => {
    if (confirm('Are you sure you want to remove this skill?')) {
      remove(idx);
    }
  }, []);

  const onSwapSkill = useCallback((idx: number, direction: 'up' | 'down') => {
    move(idx, direction === 'up' ? idx - 1 : idx + 1);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit((v) => {
      onAddSkill(v.value);
      reset();
    })(e);
  };

  return (
    <Stack gap={4}>
      <ResumeFormField label='Skills' name='data.skills' defaultEmptyValue={[]}>
        <List.Root gap={1} w='full' listStyle='none'>
          {fields.map((field, idx) => (
            <List.Item key={field.id}>
              <Flex gap={2}>
                <Input size='xs' {...register(`${name}.${idx}`)} />

                <ButtonGroup size='xs' variant='ghost' gap={0}>
                  <IconButton disabled={idx === 0} onClick={() => onSwapSkill(idx, 'up')}>
                    <MdArrowUpward />
                  </IconButton>

                  <IconButton
                    disabled={idx === fields.length - 1}
                    onClick={() => onSwapSkill(idx, 'down')}
                  >
                    <MdArrowDownward />
                  </IconButton>

                  <IconButton onClick={() => onRemoveSkill(idx)}>
                    <MdDelete />
                  </IconButton>
                </ButtonGroup>
              </Flex>
            </List.Item>
          ))}
        </List.Root>

        <Box asChild w='full'>
          <form onSubmit={onSubmit}>
            <InputGroup
              mt={4}
              endElement={
                <IconButton size='xs' variant='ghost' type='submit' disabled={!formState.isValid}>
                  <MdAdd />
                </IconButton>
              }
            >
              <Input
                placeholder='Add a new Skill'
                {...registerSkillFormField('value', {
                  required: true,
                  minLength: 1,
                  validate: (value) => !skills.includes(value),
                })}
              />
            </InputGroup>
          </form>
        </Box>
      </ResumeFormField>
    </Stack>
  );
};
