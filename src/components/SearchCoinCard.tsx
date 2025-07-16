// Types
import { SearchCoin } from '../types/CoinTypes'

interface SearchCoinCardProps {
  coin: SearchCoin;
  onClick?: (coin: SearchCoin) => void;
}

export default function SearchCoinCard({ coin, onClick }: SearchCoinCardProps) {
  return (
    <button
      onClick={() => onClick && onClick(coin)}
      className="flex items-center justify-between w-full p-4 space-y-2 bg-white border rounded-md shadow-sm border-slate-200 dark:bg-slate-800 dark:border-slate-700"
      type="button"
    >
      <div>
        <h2 className="space-x-1 font-medium dark:text-slate-200">
          {coin.market_cap_rank ? <span>#{coin.market_cap_rank}</span> : null}
          <span>{coin.name}</span>
          <span className="font-normal text-slate-400 dark:text-slate-400">
            {coin.symbol.toUpperCase()}
          </span>
        </h2>
      </div>

      <div className="w-8 aspect-square">
        <img className="w-full" src={coin.large} alt={coin.name} />
      </div>
    </button>
  );
}
