import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

import { useRouter } from "expo-router";
import styles from "./styles/login.style";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const BACKEND_URL = "http://192.168.1.79:3000";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
 const fadeAnim = useRef(new Animated.Value(0)).current;
const translateY = useRef(new Animated.Value(30)).current;
const scaleBtn = useRef(new Animated.Value(1)).current;
const [erroEmail, setErroEmail] = useState(false);

const validarEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const handlePressIn = () => {
  Animated.spring(scaleBtn, {
    toValue: 0.95,
    useNativeDriver: true,
  }).start();
};

const handlePressOut = () => {
  Animated.spring(scaleBtn, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};

useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }),
  ]).start();
}, []);

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      return Alert.alert("Erro", "Preencha email e senha");
    }

    setLoading(true);

    if (!validarEmail(email)) {
        setErroEmail(true);
        return;
      } else {
        setErroEmail(false);
      }

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
    <LinearGradient
  colors={["#0d0d0d", "#111827", "#0d0d0d"]}
  style={{ flex: 1, justifyContent: "center", padding: 20 }}
>
  

      <Animated.Image
  source={require("../assets/images/logoprincipal.png")}
  style={[
    styles.logo,
    {
      opacity: fadeAnim,
      transform: [{ translateY }],
    },
  ]}
/>

      <BlurView intensity={40} tint="dark" style={styles.card}>
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
        {erroEmail && (
  <Text style={{ color: "#ff4d4d", fontSize: 12, marginTop: -10, marginBottom: 10, marginLeft: 10}}>
    Email inválido
  </Text>
)}

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

        <Animated.View style={{ transform: [{ scale: scaleBtn }] }}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={["#2662c9", "#4A90E2"]}
                style={styles.button}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
      </BlurView>
    </LinearGradient>
  );
}
