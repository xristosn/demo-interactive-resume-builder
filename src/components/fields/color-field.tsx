import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  ColorPicker,
  Flex,
  HStack,
  Heading,
  Icon,
  List,
  ListItem,
  Portal,
  Separator,
  Stack,
  Text,
  parseColor,
} from '@chakra-ui/react';
import { useFormContext, type FieldPath } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';

import { SAMPLE_COLORS } from '@/models/constants/sample-colors';
import type { Resume } from '@/models/interfaces/resume-data';

export interface AvatarFieldProps {
  name: FieldPath<Resume>;
}

const SAMPLE_COLORS_VALUES = SAMPLE_COLORS.map((c) => c.color);
const DEFAULT_CUSTOM_COLOR = '#4ac129';

export const ColorField: React.FC<AvatarFieldProps> = ({ name }) => {
  const { setValue, watch } = useFormContext();
  const value = watch(name);
  const [customColor, setCustomColor] = useState(parseColor(DEFAULT_CUSTOM_COLOR));
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    const isCustomColor = !SAMPLE_COLORS_VALUES.includes(value);

    setIsCustom(isCustomColor);

    if (isCustomColor) {
      try {
        setCustomColor(parseColor(value));
      } catch {
        setCustomColor(parseColor(DEFAULT_CUSTOM_COLOR));
      }
    }
  }, []);

  useEffect(() => {
    if (isCustom) setValue(name, customColor.toString('hex'));
  }, [isCustom, customColor, name]);

  return (
    <>
      <List.Root listStyle='none' gap={4} w='full'>
        <Heading size='sm'>Pick one of the sample colors</Heading>

        {SAMPLE_COLORS.map(({ color, label }) => (
          <ListItem key={color}>
            <Button
              gap={2}
              size='xs'
              alignItems='center'
              w='full'
              variant='outline'
              onClick={() => {
                setValue(name, color);
                setIsCustom(false);
              }}
            >
              <Box boxSize={5} bgColor={color} rounded='full' />

              {label}

              {value === color ? (
                <Icon ml='auto'>
                  <HiCheck />
                </Icon>
              ) : (
                <Box ml='auto' />
              )}
            </Button>
          </ListItem>
        ))}

        <HStack>
          <Separator flex='1' />
          <Text flexShrink='0'>Or</Text>
          <Separator flex='1' />
        </HStack>

        <Flex gap={2} alignItems='center'>
          <Heading size='sm'>Pick a custom color </Heading>
          <Checkbox.Root
            checked={isCustom}
            onCheckedChange={(e) => {
              if (!e.checked) setValue(name, SAMPLE_COLORS[0].color);
              setIsCustom(!!e.checked);
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox.Root>
        </Flex>

        <ColorPicker.Root
          format='rgba'
          size='lg'
          value={customColor}
          onValueChange={(e) => setCustomColor(e.value)}
        >
          <ColorPicker.HiddenInput />

          <ColorPicker.Control>
            <ColorPicker.Input />
            <ColorPicker.Trigger />
          </ColorPicker.Control>

          <Portal>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <ColorPicker.Area />
                <Stack>
                  <ColorPicker.ChannelSlider channel='hue' />
                </Stack>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </Portal>
        </ColorPicker.Root>
      </List.Root>
    </>
  );
};
