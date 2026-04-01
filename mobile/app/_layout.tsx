import { Stack } from "expo-router";
import { ContractProvider } from "./context/ContractContext"; // caminho correto pro seu contexto

export default function Layout() {
  return (
    <ContractProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ContractProvider>
  );
}
