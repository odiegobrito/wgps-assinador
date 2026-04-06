import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import styles from "./styles/login.style";

const BACKEND_URL = "http://192.168.1.79:3000";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      return Alert.alert("Erro", "Preencha email e senha");
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: senha,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return Alert.alert("Erro", data?.error || "Falha ao autenticar");
      }

      if (!data?.token) {
        return Alert.alert("Erro", "Token não recebido");
      }

      const user = data?.user ?? {};

      const nome =
        user?.name || (user?.email ? user.email.split("@")[0] : "Usuário");

      router.push({
        pathname: "/uploadScreen",
        params: { nome },
      });
    } catch (error) {
      console.log("ERRO LOGIN:", error);
      Alert.alert("Erro de conexão", "Verifique o backend ou sua rede");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logoprincipal.png")}
        style={styles.logo}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Assinador Online</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#777"
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#777"
            secureTextEntry={!mostrarSenha}
            style={styles.inputField}
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Ionicons
              name={mostrarSenha ? "eye" : "eye-off"}
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => {
            Alert.alert("Recuperação de senha", "Funcionalidade em breve");
          }}
        >
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
