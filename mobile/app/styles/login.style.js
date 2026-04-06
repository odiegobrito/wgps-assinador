import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#010101",
    zIndex: 0,
  },

  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 25,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#010101",
    padding: 22,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    zIndex: 1,
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

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  inputField: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 0,
    color: "#fff",
  },

  inputFocus: {
    borderColor: "#2662c9",
    shadowColor: "#2662c9",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },

  eyeButton: {
    padding: 5,
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

  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 16,
  },

  forgotPasswordText: {
    color: "#4A90E2",
    fontSize: 13,
    fontWeight: "500",
  },
});
