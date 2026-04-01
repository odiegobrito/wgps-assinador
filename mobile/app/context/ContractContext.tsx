import React, { createContext, useContext, useState } from "react";

// Tipagem do contrato
export type ContractFile = {
  name: string;
  uri: string;
  size: number;
};

// Tipo do contexto
type ContractContextType = {
  contractFile: ContractFile | null;
  setContractFile: (file: ContractFile | null) => void;
};

// Cria o contexto
const ContractContext = createContext<ContractContextType | undefined>(
  undefined,
);

// Provider
export const ContractProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contractFile, setContractFile] = useState<ContractFile | null>(null);

  return (
    <ContractContext.Provider value={{ contractFile, setContractFile }}>
      {children}
    </ContractContext.Provider>
  );
};

// Hook para usar o contexto
export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context)
    throw new Error("useContract must be used within ContractProvider");
  return context;
};
