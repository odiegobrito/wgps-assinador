import { useRouter } from "expo-router";
import React from "react";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import { useContract } from "./context/ContractContext";
import styles from "./styles/signatureScreen.style";

export default function SignatureScreen() {
  const router = useRouter();
  const { contractFile } = useContract();

  if (!contractFile) {
    return (
      <View style={styles.container}>
        <Text style={styles.warningText}>
          Nenhum contrato foi carregado. Volte para fazer o upload.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleOpenFile = async () => {
    try {
      await Linking.openURL(contractFile.uri);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o arquivo.");
    }
  };

  // Redireciona para a tela de assinatura digital
  const handleSign = () => {
    router.push("/draw-signature"); // nova tela
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assinar Contrato</Text>

      <View style={styles.fileCard}>
        <Text style={styles.fileLabel}>Nome do arquivo:</Text>
        <Text style={styles.fileName}>{contractFile.name}</Text>
        <Text style={styles.fileLabel}>Tamanho:</Text>
        <Text style={styles.fileSize}>{contractFile.size} bytes</Text>
      </View>

      <TouchableOpacity style={styles.viewButton} onPress={handleOpenFile}>
        <Text style={styles.viewButtonText}>Visualizar Arquivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signButton} onPress={handleSign}>
        <Text style={styles.signButtonText}>Assinar →</Text>
      </TouchableOpacity>
    </View>
  );
}
