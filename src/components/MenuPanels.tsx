// Components
import { Tab } from "@headlessui/react";
import TrendingCoinCard from "./TrendingCoinCard";
import LoadingSkeleton from "./LoadingSkeleton";
import SearchCoinList from "./SearchCoinList";
import CoinCard from "./CoinCard";

import List from "./List";

import NewsList from "./NewsList";

// Context
import { useContext } from "react";
import { CoinContext } from "../context/CoinProvider";
import { useFavorites } from "../context/FavoritesProvider";

export default function MenuPanels() {
  const { data, status } = useContext(CoinContext);
  const { favorites } = useFavorites();

  function refreshPage(): void {
    window.location.reload();
  }

  if (status === "error")
    return (
      <div className="space-y-2 text-center dark:text-slate-400">
        <div>Oops! Something went wrong...</div>
        <button
          onClick={refreshPage}
          className="px-2 py-1 font-medium transition-colors bg-white border rounded-md shadow-sm border-slate-200 hover:text-emerald-500 dark:bg-slate-900 dark:border-slate-700 dark:hover:text-emerald-400"
        >
          Try Again
        </button>
      </div>
    );

  if (status === "loading") return <LoadingSkeleton quantity={10} />;

  return (
    <Tab.Panels>
      <Tab.Panel className="grid gap-2 mx-auto sm:max-w-md">
        <List
          items={data.trending}
          render={(coin, index) => (
            <TrendingCoinCard key={coin.id} coin={coin} ranking={index! + 1} />
          )}
        />
      </Tab.Panel>

      <Tab.Panel className="grid gap-2 sm:grid-cols-2">
        <List
          items={data.coins}
          render={(coin) => <CoinCard key={coin.id} coin={coin} />}
        />
      </Tab.Panel>

      <Tab.Panel>
        <SearchCoinList />
      </Tab.Panel>

      <Tab.Panel>
        {favorites.length === 0 ? (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No favorites yet. Click the heart icon on a coin to add it to
            favorites.
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            <List
              items={favorites}
              render={(coin) => <CoinCard key={coin.id} coin={coin} />}
            />
          </div>
        )}
      </Tab.Panel>

      <Tab.Panel>
        <NewsList />
      </Tab.Panel>
    </Tab.Panels>
  );
}
