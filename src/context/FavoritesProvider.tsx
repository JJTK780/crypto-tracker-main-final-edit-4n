import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@clerk/clerk-react";
import { Coin } from "../types/CoinTypes";

interface FavoritesContextType {
  favorites: Coin[];
  addFavorite: (coin: Coin) => void;
  removeFavorite: (coinId: string) => void;
  isFavorite: (coinId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Coin[]>([]);
  const { userId, isSignedIn } = useAuth();

  // Load favorites when user signs in
  useEffect(() => {
    if (isSignedIn && userId) {
      const stored = localStorage.getItem(`favorites_${userId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFavorites(parsed);
        } catch (e) {
          console.error("Error loading favorites:", e);
          localStorage.removeItem(`favorites_${userId}`);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [userId, isSignedIn]);

  // Save favorites when they change
  useEffect(() => {
    if (isSignedIn && userId && favorites.length > 0) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
    }
  }, [favorites, userId, isSignedIn]);

  const addFavorite = (coin: Coin) => {
    if (!isSignedIn) return;
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === coin.id)) {
        return [...prev, coin];
      }
      return prev;
    });
  };

  const removeFavorite = (coinId: string) => {
    if (!isSignedIn) return;
    setFavorites((prev) => prev.filter((coin) => coin.id !== coinId));
  };

  const isFavorite = (coinId: string) => {
    return favorites.some((coin) => coin.id === coinId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
