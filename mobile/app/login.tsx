import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles/login.style"

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusSenha, setFocusSenha] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // animações principais
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(80);
  const scale = useSharedValue(0.9);

  // botão
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, []);

  const animatedCard = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleLogin = async () => {
    try {
      const res = await fetch("http://192.168.1.79:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await res.json();
      console.log("Resposta do backend:", data);

      if (data.token) {
        alert("Login realizado com sucesso!");
        // Salvar token e navegar para próxima tela
      } else {
        alert("Erro: " + (data.error || "Algo deu errado"));
      }
    } catch (err) {
      console.log("Erro login:", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logoprincipal.png")}
        style={styles.logo}
      />

      <Animated.View style={[styles.card, animatedCard]}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Assinador Online</Text>

        {/* Email */}
    <View style={[styles.inputContainer, focusEmail && styles.inputFocus]}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.inputField}
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusEmail(true)}
        onBlur={() => setFocusEmail(false)}
      />
    </View>

        {/* Senha */}
        <View style={[styles.inputContainer, focusSenha && styles.inputFocus]}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#777"
            secureTextEntry={!mostrarSenha}
            style={styles.inputField}
            value={senha}
            onChangeText={setSenha}
            onFocus={() => setFocusSenha(true)}
            onBlur={() => setFocusSenha(false)}
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

        {/* Botão */}
        <Animated.View style={animatedButton}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPressIn={() => (buttonScale.value = withSpring(0.95))}
            onPressOut={() => (buttonScale.value = withSpring(1))}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

