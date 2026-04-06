import * as FileSystem from "expo-file-system/legacy";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles/signatureScreen.style";

type ReceivedScreenParams = {
  signedPdfUri?: string;
  contractName?: string;
};

export default function ReceivedScreen() {
  const router = useRouter();
  const { signedPdfUri, contractName } =
    useLocalSearchParams<ReceivedScreenParams>();

  const [fileExists, setFileExists] = useState<boolean | null>(null); // null = verificando
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const checkFile = async () => {
      console.log("📂 signedPdfUri recebido:", signedPdfUri); // 🔍

      if (!signedPdfUri) {
        setFileExists(false);
        return;
      }

      try {
        const info = await FileSystem.getInfoAsync(signedPdfUri);
        console.log("📋 info do arquivo:", info); // 🔍
        setFileExists(info.exists);
      } catch (err) {
        console.error("Erro ao verificar arquivo:", err);
        setFileExists(false);
      }
    };

    checkFile();
  }, [signedPdfUri]);

  const handleShare = async () => {
    if (!signedPdfUri || !fileExists) {
      Alert.alert("Erro", "Arquivo não encontrado no dispositivo.");
      return;
    }

    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (!isSharingAvailable) {
      Alert.alert(
        "Indisponível",
        "Compartilhamento não suportado neste dispositivo.",
      );
      return;
    }

    setSharing(true);
    try {
      await Sharing.shareAsync(signedPdfUri, {
        mimeType: "application/pdf",
        dialogTitle: contractName ?? "Contrato Assinado",
        UTI: "com.adobe.pdf", // necessário para iOS
      });
    } catch (err) {
      console.error("Erro ao compartilhar PDF:", err);
      Alert.alert("Erro", "Não foi possível compartilhar o PDF.");
    } finally {
      setSharing(false);
    }
  };

  const renderStatus = () => {
    if (fileExists === null) {
      return <ActivityIndicator color="#fff" style={{ marginVertical: 12 }} />;
    }

    if (!fileExists) {
      return (
        <Text
          style={{ color: "#ff6b6b", marginBottom: 16, textAlign: "center" }}
        >
          ⚠️ Arquivo não encontrado. Tente assinar novamente.
        </Text>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contractTitle}>CONTRATO ASSINADO ✅</Text>

      <Text style={{ color: "#aaa", marginBottom: 30 }}>
        {contractName ?? "Contrato.pdf"}
      </Text>

      {renderStatus()}

      {/* ✅ Botão só ativo se arquivo existe */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          fileExists
            ? styles.confirmButtonActive
            : styles.confirmButtonDisabled,
        ]}
        onPress={handleShare}
        disabled={!fileExists || sharing}
      >
        {sharing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmButtonText}>
            📤 Compartilhar PDF Assinado
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.replace("/")}
      >
        <Text style={{ color: "#888" }}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}
