import * as FileSystem from "expo-file-system/legacy";
import { PDFDocument } from "pdf-lib";

const SIGNATURE_SCALE = 0.25;
const SIGNATURE_MARGIN_BOTTOM = 100;

const copyToAppDirectory = async (pdfUri: string): Promise<string> => {
  const fileName = `input-${Date.now()}.pdf`;
  const destPath = `${FileSystem.documentDirectory}${fileName}`;

  await FileSystem.copyAsync({
    from: pdfUri,
    to: destPath,
  });

  return destPath;
};

const readPdfAsBase64 = async (pdfUri: string): Promise<string> => {
  try {
    return await FileSystem.readAsStringAsync(pdfUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch {
    throw new Error(`Não foi possível ler o PDF em: ${pdfUri}`);
  }
};

/**
 * Salva os bytes do PDF no sistema de arquivos e retorna o caminho.
 */
const savePdfToDevice = async (pdfBytes: Uint8Array): Promise<string> => {
  const base64 = uint8ArrayToBase64(pdfBytes);
  const path = `${FileSystem.documentDirectory}signed-${Date.now()}.pdf`;

  await FileSystem.writeAsStringAsync(path, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return path;
};

/**
 * Converte Uint8Array para base64 sem depender de Buffer.
 */
const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const addSignatureToPdf = async (
  pdfUri: string,
  signatureBase64: string,
): Promise<string> => {
  const localUri = await copyToAppDirectory(pdfUri);
  const base64Pdf = await readPdfAsBase64(localUri);

  const binaryString = atob(base64Pdf);
  const pdfBytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    pdfBytes[i] = binaryString.charCodeAt(i);
  }

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  const signatureImage = await pdfDoc.embedPng(signatureBase64);
  const sigWidth = signatureImage.width * SIGNATURE_SCALE;
  const sigHeight = signatureImage.height * SIGNATURE_SCALE;

  for (const page of pages) {
    const { width } = page.getSize();

    page.drawImage(signatureImage, {
      x: (width - sigWidth) / 2,
      y: SIGNATURE_MARGIN_BOTTOM,
      width: sigWidth,
      height: sigHeight,
    });
  }

  const signedPdfBytes = await pdfDoc.save();
  const savedPath = await savePdfToDevice(signedPdfBytes);

  await FileSystem.deleteAsync(localUri, { idempotent: true });

  console.log("✅ PDF assinado salvo em:", savedPath);
  return savedPath;
};
