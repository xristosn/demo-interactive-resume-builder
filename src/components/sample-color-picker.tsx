import { Box, Flex } from '@chakra-ui/react';

import { SAMPLE_COLORS } from '@/models/constants/sample-colors';

import { Tooltip } from './ui/tooltip';
import { ColorModeButton } from './ui/color-mode';

export interface SampleColorPickerProps {
  activeColor: string;
  setActiveColor: (newColor: string) => void;
}

export const SampleColorPicker: React.FC<SampleColorPickerProps> = ({
  activeColor,
  setActiveColor,
}) => (
  <Flex
    pos='fixed'
    bottom={4}
    left='50%'
    zIndex='overlay'
    transform='translateX(-50%)'
    justifyContent='center'
    alignItems='center'
    gap={4}
    bgColor='bg.inverted'
    color='fg.inverted'
    p={4}
    rounded='lg'
  >
    {SAMPLE_COLORS.map(({ color, label }) => (
      <Tooltip key={color} content={label} lazyMount positioning={{ gutter: 24 }}>
        <Box
          w={6}
          h={6}
          rounded='full'
          bgColor={`${color}.500`}
          border='3px solid'
          borderColor={color === activeColor ? 'bg' : 'transparent'}
          tabIndex={0}
          onClick={() => setActiveColor(color)}
        />
      </Tooltip>
    ))}

    <ColorModeButton size="sm" variant='solid' />
  </Flex>
);
