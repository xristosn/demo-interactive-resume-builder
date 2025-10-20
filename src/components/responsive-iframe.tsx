import { useCallback, useEffect, useRef, useState } from 'react';

import { debounce } from 'lodash-es';
import { Box, CloseButton, Flex, Skeleton, type BoxProps } from '@chakra-ui/react';

import { IframeMessageType } from '@/models/constants/iframe-message-type';
import type {
  IframeResumeMessage,
  IframeLoadedMesage,
  IframeMessage,
} from '@/models/interfaces/iframe-message';
import type { Resume } from '@/models/interfaces/resume-data';
import { A4_DIMENSIONS } from '@/models/constants/paper-dimensions';

export interface ResponsiveIframeProps {
  width: number;
  resume: Resume;
  isFocused?: boolean;
  onBlur?: () => void;
  templateId: string;
}

export const ResponsiveIframe: React.FC<ResponsiveIframeProps> = ({
  width,
  resume,
  isFocused,
  templateId,
  onBlur,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeProps, setIframeProps] = useState<BoxProps>({});

  const scaleIframe = useCallback(
    debounce(() => {
      if (!iframeRef.current) return;

      if (isFocused) {
        setIframeProps({
          width: `${A4_DIMENSIONS.width}px`,
          height: `${A4_DIMENSIONS.height}px`,
          maxW: '80vw',
          maxH: '80vh',
          top: `calc((100vh - min(80vh, ${A4_DIMENSIONS.height}px)) / 2)`,
          left: `calc((100vw - min(80vw, ${A4_DIMENSIONS.width}px)) / 2)`,
          position: `fixed`,
          zIndex: 'overlay',
        });
      } else {
        const containerEl = iframeRef.current.parentElement;

        if (!containerEl) return;

        const containerRect = containerEl.getBoundingClientRect();
        const scale = containerRect.width / width;

        setIframeProps({
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${width}px`,
          height: `${containerRect.height / scale}px`,
          top: `0`,
          left: `0`,
          position: `absolute`,
          pointerEvents: 'none',
          userSelect: 'none',
        });
      }
    }),
    [width, isFocused]
  );

  const postMessage = useCallback(<MessageType extends IframeMessage>(message: MessageType) => {
    if (!iframeRef.current) {
      return;
    }

    const contentWindow =
      iframeRef.current?.contentWindow || iframeRef.current?.contentDocument?.defaultView;

    contentWindow?.postMessage(message, '*');
  }, []);

  const onIframeReady = useCallback(() => {
    iframeRef.current?.removeEventListener('load', onIframeReady);

    const message: IframeResumeMessage = {
      type: IframeMessageType.ResumeUpdate,
      payload: { resume },
    };

    postMessage(message);
  }, []);

  const onWindowMessage = useCallback(
    (e: MessageEvent<IframeLoadedMesage>) => {
      const message = e.data;
      const contentWindow =
        iframeRef.current?.contentWindow || iframeRef.current?.contentDocument?.defaultView;

      if (contentWindow !== e.source) {
        return;
      }

      if (message.type === IframeMessageType.Loaded) {
        setIframeLoaded(true);
      }
    },
    [resume]
  );

  useEffect(() => {
    window.addEventListener('message', onWindowMessage);

    iframeRef.current?.addEventListener('load', onIframeReady);

    return () => {
      window.removeEventListener('message', onWindowMessage);

      iframeRef.current?.removeEventListener('load', onIframeReady);
    };
  }, []);

  useEffect(() => {
    if (!iframeLoaded) return;

    scaleIframe();

    if (!isFocused) {
      window.addEventListener('resize', scaleIframe);
    }

    return () => window.removeEventListener('resize', scaleIframe);
  }, [width, iframeLoaded, isFocused]);

  useEffect(() => {
    const message: IframeResumeMessage = {
      type: IframeMessageType.ResumeUpdate,
      payload: { resume },
    };
    postMessage(message);
  }, [resume]);

  return (
    <>
      {!iframeLoaded && <Skeleton w='full' h='full' />}

      {isFocused && (
        <Flex
          pos='fixed'
          top={0}
          left={0}
          w='full'
          h='full'
          bgColor='blackAlpha.500'
          zIndex='overlay'
          onClick={onBlur}
          pt={16}
          pr={4}
          justifyContent='end'

        >
          <CloseButton variant='solid' />
        </Flex>
      )}

      <Box
        asChild
        border='0'
        overflow='hidden'
        rounded='lg'
        transition='top 250ms ease, left 250ms ease'
        {...iframeProps}
      >
        <iframe
          src={`/template-preview?templateId=${templateId}`}
          style={{ opacity: iframeLoaded ? 1 : 0 }}
          ref={iframeRef}
        />
      </Box>
    </>
  );
};
