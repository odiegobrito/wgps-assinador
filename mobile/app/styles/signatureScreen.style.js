import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010101",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },

  warningText: {
    color: "#ff5555",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },

  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  fileCard: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  fileLabel: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 8,
  },

  fileName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },

  fileSize: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },

  signButton: {
    backgroundColor: "#2662c9",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },

  signButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
