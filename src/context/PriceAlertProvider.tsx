import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { PriceAlert } from "../types/PriceAlertTypes";
import { CoinContext } from "./CoinProvider";

interface PriceAlertContextType {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, "id" | "active">) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;
}

const PriceAlertContext = createContext<PriceAlertContextType | undefined>(undefined);

export const usePriceAlerts = (): PriceAlertContextType => {
  const context = useContext(PriceAlertContext);
  if (!context) {
    throw new Error("usePriceAlerts must be used within a PriceAlertProvider");
  }
  return context;
};

export const PriceAlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    const stored = localStorage.getItem("priceAlerts");
    return stored ? JSON.parse(stored) : [];
  });

  const { data: coinData } = useContext(CoinContext);

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  // Check alerts against current coin prices
  useEffect(() => {
    if (!coinData?.coins) return;

    alerts.forEach((priceAlert) => {
      if (!priceAlert.active) return;

      const coin = coinData.coins.find((c) => c.id === priceAlert.coinId);
      if (!coin) return;

      const currentPrice = coin.current_price;

      let alertTriggered = false;
      if (priceAlert.direction === "above" && currentPrice >= priceAlert.targetPrice) {
        alertTriggered = true;
      } else if (priceAlert.direction === "below" && currentPrice <= priceAlert.targetPrice) {
        alertTriggered = true;
      }

      if (alertTriggered) {
        // Show browser notification if permission granted
        if (Notification.permission === "granted") {
          new Notification(`Price Alert for ${priceAlert.coinName}`, {
            body: `Price is ${priceAlert.direction} $${priceAlert.targetPrice.toFixed(2)} (Current: $${currentPrice.toFixed(2)})`,
            icon: coin.image,
          });
        } else {
          // Fallback: alert popup
          alert(`Price Alert for ${priceAlert.coinName}: Price is ${priceAlert.direction} $${priceAlert.targetPrice.toFixed(2)} (Current: $${currentPrice.toFixed(2)})`);
        }

        // Mark alert as inactive after triggering
        setAlerts((prev) =>
          prev.map((a) =>
            a.id === priceAlert.id ? { ...a, active: false } : a
          )
        );
      }
    });
  }, [alerts, coinData]);

  useEffect(() => {
    localStorage.setItem("priceAlerts", JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (alert: Omit<PriceAlert, "id" | "active">) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: crypto.randomUUID(),
      active: true,
    };
    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  return (
    <PriceAlertContext.Provider value={{ alerts, addAlert, removeAlert, toggleAlert }}>
      {children}
    </PriceAlertContext.Provider>
  );
};
