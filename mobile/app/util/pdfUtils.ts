import * as FileSystem from "expo-file-system";
import { PDFDocument } from "pdf-lib";

export const addSignatureToPdf = async (
  pdfUri: string,
  signatureBase64: string,
) => {
  try {
    // ✅ Lê o PDF corretamente (local file://)
    const base64Pdf = await FileSystem.readAsStringAsync(pdfUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const pdfBytes = Uint8Array.from(atob(base64Pdf), (c) => c.charCodeAt(0));

    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Página final
    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1];
    const { width, height } = lastPage.getSize();

    // ⚠️ Corrige base64 da assinatura (remove prefixo)
    const base64Image = signatureBase64.replace("data:image/png;base64,", "");

    const signatureImage = await pdfDoc.embedPng(base64Image);

    // Tamanho
    const scale = 0.5;
    const sigWidth = signatureImage.width * scale;
    const sigHeight = signatureImage.height * scale;

    // Posição
    lastPage.drawImage(signatureImage, {
      x: (width - sigWidth) / 2,
      y: 50,
      width: sigWidth,
      height: sigHeight,
    });

    // Salva
    const pdfBytesFinal = await pdfDoc.save();

    const newPath = `${FileSystem.documentDirectory}signed-${Date.now()}.pdf`;

    await FileSystem.writeAsStringAsync(
      newPath,
      Buffer.from(pdfBytesFinal).toString("base64"),
      {
        encoding: FileSystem.EncodingType.Base64,
      },
    );

    console.log("PDF salvo em:", newPath);

    return newPath;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return null;
  }
};
