import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";
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
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

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
    if (!signatureData) {
      Alert.alert("Atenção", "Assine antes de finalizar.");
      return;
    }

    setLoading(true);

    try {
      let signedPdf = null;

      // Só assina PDF se existir
      if (contractUri) {
        signedPdf = await addSignatureToPdf(
          decodeURIComponent(contractUri),
          signatureData,
        );
      }

      setLoading(false);

      Alert.alert(
        "Assinatura concluída!",
        "Assinatura registrada com sucesso.",
        [
          {
            text: "OK",
            onPress: () =>
              router.push({
                pathname: "/success",
                params: {
                  nome,
                  signedPdfUri: signedPdf || "",
                },
              }),
          },
        ],
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível finalizar.");
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

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.contractTitle}>{contractName || "Assinatura"}</Text>

      {/* Área de assinatura */}
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

      {/* Botão */}
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
            {loading ? "Salvando..." : "Finalizar Assinatura →"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
