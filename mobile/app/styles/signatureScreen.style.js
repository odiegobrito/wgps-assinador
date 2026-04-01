import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F2",
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },

  contractTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1A1A2E",
  },

  signatureWrapper: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E0DED8",
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 20,
  },

  signatureHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EFE9",
  },

  signatureLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#AAA",
    letterSpacing: 2,
  },

  clearText: {
    color: "#E74C3C",
    fontWeight: "600",
  },

  canvasContainer: {
    flex: 1,
    minHeight: 200,
  },

  signatureCanvas: {
    flex: 1,
  },

  signatureFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0EFE9",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1CFC7",
  },

  statusDotActive: {
    backgroundColor: "#2ECC71",
  },

  statusText: {
    fontSize: 12,
    color: "#999",
  },

  confirmButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  confirmButtonActive: {
    backgroundColor: "#1A1A2E",
  },

  confirmButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },

  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  pdfContainer: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0DED8",
  },
});
