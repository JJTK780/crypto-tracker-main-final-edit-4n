import React from "react";
import { usePriceAlerts } from "../context/PriceAlertProvider";

export default function PriceAlertList() {
  const { alerts, removeAlert, toggleAlert } = usePriceAlerts();

  if (alerts.length === 0) {
    return <div className="text-center p-4 text-slate-600 dark:text-slate-400">No price alerts set.</div>;
  }

  return (
    <div className="space-y-4 p-4 border rounded-md shadow-sm dark:border-slate-700">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center justify-between p-3 border rounded-md dark:border-slate-600"
        >
          <div>
            <div className="font-semibold">{alert.coinName} ({alert.coinId})</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Alert when price is {alert.direction} ${alert.targetPrice.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleAlert(alert.id)}
              className={`px-2 py-1 rounded-md text-white ${
                alert.active ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-500 hover:bg-gray-600"
              }`}
              title={alert.active ? "Disable Alert" : "Enable Alert"}
            >
              {alert.active ? "Active" : "Inactive"}
            </button>
            <button
              onClick={() => removeAlert(alert.id)}
              className="px-2 py-1 text-red-600 rounded-md hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400"
              title="Remove Alert"
            >
              &times;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
