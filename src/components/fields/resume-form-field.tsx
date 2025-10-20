import { Button, Field, Flex, Text } from '@chakra-ui/react';
import { useController, useFormContext, type FieldPath, type FieldValues } from 'react-hook-form';

import type { Resume } from '@/models/interfaces/resume-data';

export interface ResumeFormFieldProps extends React.PropsWithChildren {
  name: FieldPath<Resume> | FieldPath<FieldValues>;
  label: string;
  required?: boolean;
  defaultEmptyValue?: unknown;
}

export const ResumeFormField: React.FC<ResumeFormFieldProps> = ({
  name,
  required,
  label,
  children,
  defaultEmptyValue = '',
}) => {
  const {
    fieldState: { error },
  } = useController<Resume>({ name: name as FieldPath<Resume> });
  const { setValue } = useFormContext();

  return (
    <Field.Root required={required} w='full' invalid={!!error}>
      <Flex gap={2} justifyContent='space-between' w='full'>
        <Field.Label>
          {label} {required && <Text color='red.fg'>*</Text>}
        </Field.Label>

        {!required && (
          <Button ml='auto' variant='ghost' size='xs' h='auto' onClick={() => setValue(name, defaultEmptyValue)}>
            Clear
          </Button>
        )}
      </Flex>

      {children}

      {error?.message && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  );
};
