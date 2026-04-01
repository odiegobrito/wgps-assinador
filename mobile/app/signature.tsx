import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
import styles from "./styles/signatureScreen.style";
import { addSignatureToPdf } from "./util/pdfUtils";

export default function SignatureScreen() {
  const params = useLocalSearchParams<{
    nome?: string;
    contractName?: string;
    contractUri?: string;
  }>();

  const { contractName, contractUri } = params;

  const signatureRef = useRef<SignatureCanvas>(null);

  const [hasDrawn, setHasDrawn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const router = useRouter();

  const handleSignature = async (sig: string) => {
    console.log("Assinatura recebida");

    if (!sig) {
      Alert.alert("Erro", "Assinatura inválida.");
      return;
    }

    setLoading(true);

    try {
      let signedPdf = null;

      if (contractUri) {
        signedPdf = await addSignatureToPdf(
          decodeURIComponent(contractUri),
          sig,
        );
      }

      setLoading(false);

      router.replace({
        pathname: "/receivedScreen",
        params: {
          signedPdfUri: signedPdf || "",
          contractName: contractName || "Contrato.pdf",
        },
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível finalizar.");
    }
  };
  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setHasDrawn(false);
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
            onBegin={() => setHasDrawn(true)}
            onEmpty={() => setHasDrawn(false)} // 👈 ESSENCIAL
            autoClear={false}
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
          onPress={() => {
            if (!hasDrawn) {
              Alert.alert("Atenção", "Assine antes de finalizar.");
              return;
            }

            console.log("Lendo assinatura...");
            signatureRef.current?.readSignature();
          }}
          onPressIn={() => animatePress(0.96)}
          onPressOut={() => animatePress(1)}
          disabled={!hasDrawn || loading}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? "Salvando..." : "Finalizar Assinatura →"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
