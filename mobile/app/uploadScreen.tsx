import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function UploadScreen() {
  const { nome } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Bem vindo, {nome || "Usuário"}
      </Text>
    </View>
  );
}
