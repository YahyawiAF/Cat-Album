import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCatImagesByBreed, getBreeds } from "../api/CatApi";

interface CatAPIContextProps {
  breeds: Breed[] | null;
  cats: Cat[] | null;
  loading: boolean;
  selectedBreed: string;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
  setCats: React.Dispatch<React.SetStateAction<Cat[] | null>>;
  loadCats: (breedId: string, limit: number, page: number) => Promise<void>;
}

interface Breed {
  id: string;
  name: string;
}

interface Cat {
  id: string;
  url: string;
  breed: Breed;
}

const CatAPIContext = createContext<CatAPIContextProps>({
  breeds: null,
  cats: null,
  loading: false,
  selectedBreed: "",
  setSelectedBreed: () => {},
  setCats: () => {},
  loadCats: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export function CatAPIProvider({ children }: Props) {
  const [breeds, setBreeds] = useState<Breed[] | null>(null);
  const [cats, setCats] = useState<Cat[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const data = await getBreeds();
        setBreeds(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBreeds();
  }, []);

  const loadCats = async (breedId: string, limit: number, page: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=${limit}&page=${page}`
      );
      setCats((prevCats) => (prevCats ? [...prevCats, ...data] : data));
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(
        "Apologies but we could not load new cats for you at this time! Miau!"
      );
    }
  };

  return (
    <CatAPIContext.Provider
      value={{
        breeds,
        cats,
        loading,
        selectedBreed,
        setCats,
        setSelectedBreed,
        loadCats,
      }}
    >
      {children}
    </CatAPIContext.Provider>
  );
}

export function useCatAPI() {
  return useContext(CatAPIContext);
}
