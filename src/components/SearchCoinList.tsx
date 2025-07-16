// Components
import SearchCoinCard from "./SearchCoinCard";
import List from "./List";

// Hooks
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

// Libs
import axios from "axios";

// Types
import { SearchCoin } from "../types/CoinTypes";

export default function SearchCoinList() {
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [value, setValue] = useState("");

  async function search() {
    if (!value) return;

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${value}`
      );
      setCoins(response.data.coins);
    } catch (error) {
      console.error("Error searching coins:", error);
      setCoins([]);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  useDebounce(search, 1500, [value]);

  return (
    <>
      <input
        className="block w-full px-4 py-2 mx-auto mb-4 border rounded-md shadow-sm border-slate-200 placeholder:text-slate-300 focus:outline-none sm:max-w-md"
        onChange={handleChange}
        value={value}
        placeholder="Search coins eg. JJTK coin"
        type="text"
      />

      <div className="grid gap-2 sm:grid-cols-2">
        <List
          items={coins}
          render={(coin) => <SearchCoinCard key={coin.id} coin={coin} />}
        />
      </div>
    </>
  );
}
