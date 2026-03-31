import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./styles/login.style";

const BACKEND_URL = "http://192.168.1.79:3000";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleLogin = async () => {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha email e senha");
    }

    try {
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await res.json();

      if (res.status === 200 && data.token) {
        Alert.alert("Sucesso", "Login realizado!", [
          {
            text: "OK",
            onPress: () => navigation?.navigate("UploadScreen"),
          },
        ]);
      } else {
        Alert.alert("Erro", data.error || "Falha ao autenticar");
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
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

        {/* Email */}
        <View style={[styles.inputContainer, styles.inputFocus, ]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#777"
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            
          />
        </View>

        {/* Senha */}
        <View style={[styles.inputContainer, styles.inputFocus,]}>
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

        {/* Botão */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}