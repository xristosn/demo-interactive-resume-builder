import { useEffect } from 'react';

import { Icon, Switch } from '@chakra-ui/react';
import { useController, useFormContext, type FieldPath } from 'react-hook-form';
import { FaMoon, FaSun } from 'react-icons/fa6';

import type { Resume } from '@/models/interfaces/resume-data';

import { useColorMode } from '../ui/color-mode';

export interface ThemeFieldProps {
  name: FieldPath<Resume>;
}

export const ThemeField: React.FC<ThemeFieldProps> = ({ name }) => {
  const { field } = useController({ name, rules: { validate: (v) => Boolean(v) } });
  const { setValue } = useFormContext();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(field.value);
  }, [field.value]);

  return (
    <Switch.Root
      checked={field.value === 'light'}
      onCheckedChange={(e) => setValue(name, e.checked ? 'light' : 'dark')}
      size='lg'
      colorPalette='orange'
    >
      <Switch.HiddenInput onBlur={field.onBlur} />

      <Switch.Control>
        <Switch.Thumb />
        <Switch.Indicator fallback={<Icon as={FaMoon} color='gray.400' />}>
          <Icon as={FaSun} color='yellow.400' />
        </Switch.Indicator>
      </Switch.Control>
    </Switch.Root>
  );
};
