import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Pdf from "react-native-pdf";
import SignatureCanvas from "react-native-signature-canvas";
import styles from "./styles/signatureScreen.style";
import { addSignatureToPdf } from "./util/pdfUtils";

export default function SignatureScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    nome?: string;
    contractName?: string;
    contractUri?: string;
  }>();
  const { nome, contractName, contractUri } = params;

  const signatureRef = useRef<SignatureCanvas>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (contractUri) {
      setPdfUri(decodeURIComponent(contractUri));
    }
  }, [contractUri]);

  const handleSignature = (sig: string) => {
    setSignatureData(sig);
    setHasDrawn(true);
  };

  const handleEmpty = () => {
    setHasDrawn(false);
    setSignatureData(null);
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setSignatureData(null);
    setHasDrawn(false);
  };

  const handleFinish = async () => {
    if (!signatureData || !pdfUri) {
      Alert.alert("Atenção", "Assine o contrato antes de finalizar.");
      return;
    }

    setLoading(true);
    try {
      const signedPdf = await addSignatureToPdf(pdfUri, signatureData);
      setLoading(false);
      Alert.alert(
        "Contrato Assinado!",
        "Sua assinatura foi aplicada com sucesso.",
        [
          {
            text: "OK",
            onPress: () =>
              router.push({
                pathname: "/success",
                params: { nome, signedPdfUri: signedPdf },
              }),
          },
        ],
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível assinar o contrato.");
    }
  };

  const animatePress = (toValue: number) => {
    Animated.spring(scaleAnim, {
      toValue,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const webStyle = `
    .m-signature-pad { box-shadow: none; border: none; }
    .m-signature-pad--body { border: none; }
    .m-signature-pad--footer { display: none; }
    body, html { background-color: #FFFFFF; }
  `;

  if (!pdfUri) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1A1A2E" />
        <Text style={{ marginTop: 10 }}>CARREGANDO CONTRATO</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.contractTitle}>{contractName || "Contrato.pdf"}</Text>

      {/* PDF Preview */}
      <View style={styles.pdfContainer}>
        <Pdf
          source={{ uri: pdfUri }}
          style={{ flex: 1, width: Dimensions.get("window").width }}
          onError={(e) => console.log("PDF error:", e)}
          onLoadComplete={(numberOfPages) =>
            console.log(`PDF carregado, páginas: ${numberOfPages}`)
          }
        />
      </View>

      {/* Signature Box */}
      <View style={styles.signatureWrapper}>
        <View style={styles.signatureHeader}>
          <Text style={styles.signatureLabel}>ASSINE AQUI</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.canvasContainer}>
          <SignatureCanvas
            ref={signatureRef}
            onOK={handleSignature}
            onEmpty={handleEmpty}
            onBegin={() => setHasDrawn(true)}
            descriptionText=""
            clearText="Limpar"
            confirmText="Salvar"
            webStyle={webStyle}
            backgroundColor="white"
            penColor="#1A1A2E"
            dotSize={2}
            minWidth={2}
            maxWidth={4}
            style={styles.signatureCanvas}
          />
        </View>

        <View style={styles.signatureFooter}>
          <View
            style={[styles.statusDot, hasDrawn && styles.statusDotActive]}
          />
          <Text style={styles.statusText}>
            {hasDrawn ? "Assinatura detectada" : "Aguardando assinatura..."}
          </Text>
        </View>
      </View>

      {/* Confirm Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            hasDrawn
              ? styles.confirmButtonActive
              : styles.confirmButtonDisabled,
          ]}
          onPress={handleFinish}
          onPressIn={() => animatePress(0.96)}
          onPressOut={() => animatePress(1)}
          disabled={loading}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? "Aplicando assinatura..." : "Finalizar Contrato →"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
