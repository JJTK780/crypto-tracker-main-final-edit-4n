import React, { useState, useEffect } from "react";
import { usePriceAlerts } from "../context/PriceAlertProvider";

interface PriceAlertFormProps {
  coinId?: string;
  coinName?: string;
  onClose: () => void;
}

export default function PriceAlertForm({ coinId: initialCoinId = "", coinName: initialCoinName = "", onClose }: PriceAlertFormProps) {
  const { addAlert } = usePriceAlerts();
  const [coinId, setCoinId] = useState(initialCoinId);
  const [coinName, setCoinName] = useState(initialCoinName);
  const [targetPrice, setTargetPrice] = useState("");
  const [direction, setDirection] = useState<"above" | "below">("above");

  useEffect(() => {
    setCoinId(initialCoinId);
    setCoinName(initialCoinName);
  }, [initialCoinId, initialCoinName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coinId || !coinName || !targetPrice) return;
    addAlert({
      coinId,
      coinName,
      targetPrice: parseFloat(targetPrice),
      direction,
    });
    setCoinId("");
    setCoinName("");
    setTargetPrice("");
    setDirection("above");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-sm dark:border-slate-700">
      <div>
        <label className="block mb-1 font-medium">Coin ID</label>
        <input
          type="text"
          value={coinId}
          onChange={(e) => setCoinId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
          placeholder="e.g. bitcoin"
          required
          readOnly={!!initialCoinId}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Coin Name</label>
        <input
          type="text"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
          placeholder="e.g. Bitcoin"
          required
          readOnly={!!initialCoinName}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Target Price</label>
        <input
          type="number"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
          placeholder="e.g. 50000"
          required
          min="0"
          step="any"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Direction</label>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as "above" | "below")}
          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
      >
        Add Alert
      </button>
    </form>
  );
}
