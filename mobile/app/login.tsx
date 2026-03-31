import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusSenha, setFocusSenha] = useState(false);

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
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", senha);
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
        <Text style={styles.subtitle}>Entre para continuar</Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={[
            styles.input,
            focusEmail && styles.inputFocus,
          ]}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusEmail(true)}
          onBlur={() => setFocusEmail(false)}
        />

        {/* Senha */}
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#777"
          secureTextEntry
          style={[
            styles.input,
            focusSenha && styles.inputFocus,
          ]}
          value={senha}
          onChangeText={setSenha}
          onFocus={() => setFocusSenha(true)}
          onBlur={() => setFocusSenha(false)}
        />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0a0a0a",
  },

  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 25,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#121212",
    padding: 22,
    borderRadius: 20,

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
  },

  title: {
    fontSize: 26,
    marginBottom: 5,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#aaa",
  },

  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 14,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },

  inputFocus: {
    borderColor: "#2662c9",
    shadowColor: "#2662c9",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  button: {
    backgroundColor: "#2662c9",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});