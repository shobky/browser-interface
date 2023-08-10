"use client";
import { SiteMetadata } from "@/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface FavoritesState {
  metadata: SiteMetadata[];
  editing: boolean;
  handleEditing: () => void;
  addMetaData: (newMetaData: SiteMetadata) => void;
  setMetaData: (newMetaData: SiteMetadata[]) => void;
}
const FavoritesContext = createContext<FavoritesState | undefined>(undefined);

export const FavoritesProvider = ({
  children,
}: {
  children?: ReactNode | any;
}) => {
  const [metadata, setMetadata] = useState<SiteMetadata[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedArray: SiteMetadata[] =
      JSON.parse(String(localStorage.getItem("myArray"))) || [];
    setMetadata(storedArray);
  }, []);

  const addMetaData = (newMetaData: SiteMetadata) => {
    setMetadata(prev => [...prev, newMetaData]);
  };

  const setMetaData = (newMetaData: SiteMetadata[]) => {
    setMetadata(newMetaData);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };
  const values: FavoritesState = {
    metadata,
    editing,
    addMetaData,
    setMetaData,
    handleEditing,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
