import { useEffect, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // animação
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withTiming(0, { duration: 800 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
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

      {/* Card animado */}
      <Animated.View style={[styles.card, animatedStyle]}>

        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#010101",
  },

  logo: {
    width: 100, 
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,

    // Android
    elevation: 8,

    // iOS
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#FFF",
  },

  button: {
    backgroundColor: "#2662c9",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});