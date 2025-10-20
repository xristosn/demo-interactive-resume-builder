import {
  Button,
  FileUpload,
  Image,
  Text,
  type FileUploadFileAcceptDetails,
} from '@chakra-ui/react';
import { useFormContext, type FieldPath } from 'react-hook-form';
import { HiUpload } from 'react-icons/hi';

import type { Resume } from '@/models/interfaces/resume-data';

import { imageToDataURI } from '@/utils/data-uri';

export interface AvatarFieldProps {
  name: FieldPath<Resume>;
}

export const AvatarField: React.FC<AvatarFieldProps> = ({ name }) => {
  const { setValue, watch } = useFormContext();
  const value = watch(name);

  const onFileAccept = async (e: FileUploadFileAcceptDetails) => {
    const file = e.files?.[0];

    const dataUri = await imageToDataURI(file);

    setValue(name, dataUri);
  };

  return (
    <>
      <FileUpload.Root
        accept={['image/*']}
        maxFiles={1}
        maxFileSize={2097152}
        w='full'
        onFileAccept={onFileAccept}
      >
        <FileUpload.HiddenInput />

        <FileUpload.Dropzone w='full' gap={2}>
          {value && <Image src={value} maxW='40' p={4} rounded='sm' />}

          <FileUpload.Trigger asChild>
            <Button variant='outline' size='sm'>
              <HiUpload /> Upload file
            </Button>
          </FileUpload.Trigger>

          <Text fontSize='sm' color='fg.muted'>
            Or drag and drop here
          </Text>
        </FileUpload.Dropzone>

        <FileUpload.Trigger asChild></FileUpload.Trigger>
      </FileUpload.Root>
    </>
  );
};
