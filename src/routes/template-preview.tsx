import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Box,
  ChakraProvider,
  Skeleton,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router';

import { TEMPLATES_CONFIG } from '@/models/constants/templates-config';
import type { IframeResumeMessage, IframeLoadedMesage } from '@/models/interfaces/iframe-message';
import { IframeMessageType } from '@/models/constants/iframe-message-type';
import type { Resume } from '@/models/interfaces/resume-data';
import { A4_DIMENSIONS } from '@/models/constants/paper-dimensions';

import { createColor } from '@/utils/create-color';

export interface TemplatePreviewProps {
  resume?: Resume;
}

const IS_IFRAME = window.self !== window.top;

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ resume: inboundResume }) => {
  const [params] = useSearchParams();
  const [resume, setResume] = useState<Resume>();
  const templateConfig = TEMPLATES_CONFIG.find((t) => t.id === params.get('templateId'));

  const theme = useMemo(() => {
    if (!resume?.primaryPaletteBase) {
      return createSystem(defaultConfig);
    }

    const defaultPaletteColor =
      resume?.primaryPaletteBase &&
      defaultConfig.theme?.tokens?.colors?.[resume.primaryPaletteBase];

    if (defaultPaletteColor) {
      return createSystem(
        defaultConfig,
        defineConfig({
          theme: {
            tokens: {
              colors: {
                primary: defaultPaletteColor,
              },
            },
          },
        })
      );
    } else {
      return createSystem(
        defaultConfig,
        defineConfig({
          theme: {
            tokens: {
              colors: {
                primary: createColor(resume.primaryPaletteBase, resume.theme),
              },
            },
          },
        })
      );
    }
  }, [resume?.primaryPaletteBase, resume?.theme]);

  const onWindowMessage = useCallback((e: MessageEvent<IframeResumeMessage>) => {
    const message = e.data;

    if (message?.type === IframeMessageType.ResumeUpdate) {
      setResume(message.payload.resume);
    }
  }, []);

  useEffect(() => {
    if (!IS_IFRAME) return;

    window.addEventListener('message', onWindowMessage);

    return () => window.removeEventListener('message', onWindowMessage);
  }, []);

  useEffect(() => {
    if (!IS_IFRAME || !resume || !templateConfig) return;

    const message: IframeLoadedMesage = { type: IframeMessageType.Loaded };

    window.parent.postMessage(message, '*');
  }, [!!resume, !!templateConfig]);

  useEffect(() => {
    if (inboundResume) {
      setResume(inboundResume);
    }
  }, [inboundResume]);

  if (!templateConfig || !resume) return <Skeleton w='full' h='full' />;

  return (
    <Box maxW={A4_DIMENSIONS.width} minH={IS_IFRAME ? '100vh' : 'auto'} id='preview' bgColor='bg'>
      <ChakraProvider value={theme}>
        <templateConfig.component {...resume} />
      </ChakraProvider>
    </Box>
  );
};
