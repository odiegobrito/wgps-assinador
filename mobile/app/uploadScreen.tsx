import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import {
    Alert,
    Animated,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useContract } from "./context/ContractContext";
import styles from "./styles/uploadScreen.style";

export default function UploadScreen() {
  const { nome } = useLocalSearchParams<{ nome?: string }>();
  const router = useRouter();

  const { contractFile, setContractFile } = useContract();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if ("canceled" in result) {
        if (!result.canceled && result.assets?.length) {
          const asset = result.assets[0];
          setContractFile({
            name: asset.name,
            uri: asset.uri,
            size: asset.size ?? 0,
          });
        }
      } else if (result.type === "success") {
        setContractFile({
          name: result.name,
          uri: result.uri,
          size: result.size ?? 0,
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
    }
  };

  const handleNext = () => {
    if (!contractFile) {
      Alert.alert("Atenção", "Faça o upload do contrato antes de continuar.");
      return;
    }

    router.push("/signature");
  };

  const animatePress = (toValue: number) => {
    Animated.spring(scaleAnim, {
      toValue,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logoprincipal.png")}
          style={styles.logoMark}
        />
        <Text style={styles.appName}>WGPS SIGNFLOW</Text>
      </View>

      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{nome ?? "Usuário"}</Text>
        <Text style={styles.subtitle}>
          Faça o upload do contrato para prosseguir com a assinatura.
        </Text>
      </View>

      {/* Upload Area */}
      <TouchableOpacity
        style={[styles.uploadArea, contractFile && styles.uploadAreaFilled]}
        onPress={handleUpload}
        activeOpacity={0.85}
      >
        {contractFile ? (
          <View style={styles.fileInfo}>
            <View style={styles.fileIconWrapper}>
              <Text style={styles.fileIcon}>📄</Text>
            </View>

            <View style={styles.fileDetails}>
              <Text style={styles.fileName} numberOfLines={1}>
                {contractFile.name}
              </Text>
              <Text style={styles.fileSize}>
                {formatFileSize(contractFile.size)}
              </Text>
            </View>

            <View style={styles.checkBadge}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
          </View>
        ) : (
          <View style={styles.uploadPlaceholder}>
            <View style={styles.uploadIconWrapper}>
              <Text style={styles.uploadIcon}>⬆</Text>
            </View>
            <Text style={styles.uploadTitle}>Upload do Contrato</Text>
            <Text style={styles.uploadHint}>PDF, DOC ou DOCX</Text>
          </View>
        )}
      </TouchableOpacity>

      {contractFile && (
        <TouchableOpacity onPress={handleUpload} style={styles.changeFile}>
          <Text style={styles.changeFileText}>Trocar arquivo</Text>
        </TouchableOpacity>
      )}

      {/* Steps */}
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={[styles.stepDot, styles.stepDotActive]} />
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Upload</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.step}>
          <View style={styles.stepDot} />
          <Text style={styles.stepLabel}>Assinatura</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.step}>
          <View style={styles.stepDot} />
          <Text style={styles.stepLabel}>Conclusão</Text>
        </View>
      </View>

      {/* Next Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !contractFile && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          onPressIn={() => animatePress(0.96)}
          onPressOut={() => animatePress(1)}
          activeOpacity={1}
        >
          <Text style={styles.nextButtonText}>Próximo →</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
