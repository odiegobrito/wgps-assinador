import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles/signatureScreen.style";

export default function ReceivedScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    signedPdfUri?: string;
    contractName?: string;
  }>();

  const { signedPdfUri, contractName } = params;

  const handleDownload = async () => {
    if (!signedPdfUri) {
      Alert.alert("Erro", "Arquivo não encontrado.");
      return;
    }

    try {
      await Linking.openURL(signedPdfUri);
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o PDF.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.contractTitle}>CONTRATO ASSINADO ✅</Text>

      {/* Nome do contrato */}
      <Text style={{ color: "#aaa", marginBottom: 30 }}>
        {contractName || "Contrato.pdf"}
      </Text>

      {/* Botão download */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleDownload}>
        <Text style={styles.confirmButtonText}>📥 Baixar PDF Assinado</Text>
      </TouchableOpacity>

      {/* Voltar (opcional) */}
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.replace("/")}
      >
        <Text style={{ color: "#888" }}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}
