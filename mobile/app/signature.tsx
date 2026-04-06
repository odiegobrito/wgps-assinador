import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
import styles from "./styles/signatureScreen.style";
import { addSignatureToPdf } from "./util/pdfUtils";

const SIGNATURE_WEB_STYLE = `
  .m-signature-pad { box-shadow: none; border: none; }
  .m-signature-pad--body { border: none; }
  .m-signature-pad--footer { display: none; }
  body, html { background-color: #FFFFFF; }
`;

type SignatureScreenParams = {
  nome?: string;
  contractName?: string;
  contractUri?: string;
};

export default function SignatureScreen() {
  const { contractName, contractUri } =
    useLocalSearchParams<SignatureScreenParams>();

  const signatureRef = useRef<SignatureCanvas>(null);
  const router = useRouter();

  const [hasDrawn, setHasDrawn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleSignature = async (sig: string) => {
    console.log("sig length:", sig?.length);
    console.log("contractUri:", contractUri);
    console.log("contractName:", contractName);

    if (!sig || !contractUri) {
      Alert.alert("Erro", "Assinatura ou contrato inválido.");
      return;
    }

    setLoading(true);

    try {
      const base64Signature = sig.replace("data:image/png;base64,", "");
      const decodedUri = decodeURIComponent(contractUri);

      const signedPdfUri = await addSignatureToPdf(decodedUri, base64Signature);

      router.replace({
        pathname: "/receivedScreen",
        params: {
          signedPdfUri,
          contractName: contractName ?? "Contrato.pdf",
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido.";
      console.error("Erro ao salvar PDF:", err);
      Alert.alert("Erro ao salvar", message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setHasDrawn(false);
  };

  const handleConfirm = () => {
    if (!hasDrawn) {
      Alert.alert("Atenção", "Assine antes de finalizar.");
      return;
    }
    signatureRef.current?.readSignature();
  };

  const animatePress = (toValue: number) => {
    Animated.spring(scaleAnim, {
      toValue,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contractTitle}>{contractName ?? "Assinatura"}</Text>

      <View style={styles.signatureWrapper}>
        <View style={styles.signatureHeader}>
          <Text style={styles.signatureLabel}>ASSINE AQUI</Text>
          <TouchableOpacity onPress={handleClear} disabled={loading}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.canvasContainer}>
          <SignatureCanvas
            ref={signatureRef}
            onOK={handleSignature}
            onBegin={() => setHasDrawn(true)}
            onEmpty={() => {
              setHasDrawn(false);
              console.log("⚠️ Canvas reportou vazio ao tentar ler");
            }}
            autoClear={false}
            descriptionText=""
            clearText="Limpar"
            confirmText="Salvar"
            webStyle={SIGNATURE_WEB_STYLE}
            backgroundColor="white"
            penColor="#000"
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
            {hasDrawn ? "Assinatura capturada" : "Aguardando assinatura..."}
          </Text>
        </View>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            hasDrawn && !loading
              ? styles.confirmButtonActive
              : styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          onPressIn={() => animatePress(0.96)}
          onPressOut={() => animatePress(1)}
          disabled={!hasDrawn || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>Finalizar Assinatura →</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
