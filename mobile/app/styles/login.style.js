import { StyleSheet } from "react-native";

export default StyleSheet.create({
  

  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },

  card: {
    padding: 22,
  borderRadius: 20,

  backgroundColor: "rgba(255,255,255,0.05)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.1)",

  overflow: "hidden",
  },

  title: {
    fontSize: 28,
    marginBottom: 5,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 13,
    marginBottom: 25,
    textAlign: "center",
    color: "#aaa",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 12,
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
    shadowColor: "#2662c9",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
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
    color: "#2662c9",
    fontSize: 13,
    fontWeight: "500",
  },
});
