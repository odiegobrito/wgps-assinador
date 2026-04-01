import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010101",
    padding: 20,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoMark: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 25,
    resizeMode: "contain",
  },

  appName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  greetingSection: {
    marginBottom: 30,
  },

  greeting: {
    color: "#aaa",
    fontSize: 16,
  },

  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#888",
    marginTop: 5,
  },

  uploadArea: {
    borderWidth: 2,
    borderColor: "#333",
    borderStyle: "dashed",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    marginBottom: 15,
  },

  uploadAreaFilled: {
    borderStyle: "solid",
    borderColor: "#2662c9",
  },

  uploadPlaceholder: {
    alignItems: "center",
  },

  uploadIconWrapper: {
    marginBottom: 10,
  },

  uploadIcon: {
    fontSize: 28,
    color: "#aaa",
  },

  uploadTitle: {
    color: "#fff",
    fontWeight: "bold",
  },

  uploadHint: {
    color: "#777",
    fontSize: 12,
  },

  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  fileIconWrapper: {
    marginRight: 10,
  },

  fileIcon: {
    fontSize: 22,
  },

  fileDetails: {
    flex: 1,
  },

  fileName: {
    color: "#fff",
    fontWeight: "bold",
  },

  fileSize: {
    color: "#888",
    fontSize: 12,
  },

  checkBadge: {
    backgroundColor: "#2662c9",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  checkIcon: {
    color: "#fff",
    fontWeight: "bold",
  },

  changeFile: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  changeFileText: {
    color: "#2662c9",
    fontSize: 12,
  },

  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  step: {
    alignItems: "center",
  },

  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#555",
    marginBottom: 5,
  },

  stepDotActive: {
    backgroundColor: "#2662c9",
  },

  stepLabel: {
    color: "#777",
    fontSize: 12,
  },

  stepLabelActive: {
    color: "#fff",
  },

  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
    marginHorizontal: 5,
  },

  nextButton: {
    backgroundColor: "#2662c9",
    padding: 16,
    borderRadius: 12,
  },

  nextButtonDisabled: {
    backgroundColor: "#333",
  },

  nextButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#2662c9",
  },
});
