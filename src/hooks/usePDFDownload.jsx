import { usePDF } from 'react-to-pdf';

export const usePDFDownload = ({
 filename,
 options = {},
} = {}) => {
  const { toPDF, targetRef } = usePDF({ filename, ...options });

  return { toPDF, targetRef };
};
