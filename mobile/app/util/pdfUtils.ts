import * as FileSystem from "expo-file-system";
import { PDFDocument } from "pdf-lib";

export const addSignatureToPdf = async (
  pdfUri: string,
  signatureBase64: string,
) => {
  // Carrega PDF existente
  const existingPdfBytes = await fetch(pdfUri).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Última página
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];
  const { width: pageWidth, height: pageHeight } = lastPage.getSize();

  // Embeda a assinatura
  const signatureImage = await pdfDoc.embedPng(signatureBase64);

  // Tamanho da assinatura (ajustável)
  const scale = 0.5;
  const sigWidth = signatureImage.width * scale;
  const sigHeight = signatureImage.height * scale;

  // Centraliza horizontal e posiciona 50px do final
  const x = (pageWidth - sigWidth) / 2;
  const y = 50;

  lastPage.drawImage(signatureImage, {
    x,
    y,
    width: sigWidth,
    height: sigHeight,
  });

  // Salva PDF
  const pdfBytes = await pdfDoc.save();

  const path = `${FileSystem.documentDirectory}contract-signed.pdf`;
  await FileSystem.writeAsStringAsync(
    path,
    Buffer.from(pdfBytes).toString("base64"),
    {
      encoding: FileSystem.EncodingType.Base64,
    },
  );

  return path; // URI compatível com Expo
};
