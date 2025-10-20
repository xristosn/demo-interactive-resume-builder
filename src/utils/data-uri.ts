export function imageToDataURI(file: File): Promise<string | undefined> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const dataUri = reader.result?.toString();

      resolve(dataUri);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

export function dataURIToBlobUrl(src: string) {
  const byteString = atob(src.split(',')[1]);
  const mimeString = src.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });

  return URL.createObjectURL(blob);
}
