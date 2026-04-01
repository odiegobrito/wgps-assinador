import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import SignaturePad from "react-native-signature-canvas";
import styles from "./styles/signatureScreen.style";

export default function DrawSignatureScreen() {
  const router = useRouter();
  const [signature, setSignature] = useState<string | null>(null);

  const handleOK = (sig: string) => {
    setSignature(sig); // Base64 da assinatura
    Alert.alert("Assinatura", "Assinatura capturada com sucesso!");
  };

  const handleClear = () => {
    setSignature(null);
  };

  const handleFinish = () => {
    if (!signature) {
      Alert.alert("Atenção", "Desenhe sua assinatura antes de continuar.");
      return;
    }
    router.push("/completion");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenhe sua assinatura</Text>

      <View style={{ flex: 1, width: "100%", marginVertical: 20 }}>
        <SignaturePad
          onOK={handleOK}
          onEmpty={() => setSignature(null)}
          webStyle={`.m-signature-pad--footer {display: none; margin: 0;}`}
        />
      </View>

      <TouchableOpacity style={styles.signButton} onPress={handleFinish}>
        <Text style={styles.signButtonText}>Finalizar →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.viewButton, { marginTop: 10 }]}
        onPress={handleClear}
      >
        <Text style={styles.viewButtonText}>Limpar</Text>
      </TouchableOpacity>
    </View>
  );
}
