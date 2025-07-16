import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CoinChart from "./CoinChart";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useAuth, SignInButton } from "@clerk/clerk-react";

// Context
import { useContext } from "react";
import { CoinContext } from "../context/CoinProvider";
import { useFavorites } from "../context/FavoritesProvider";

// Types
import { Coin } from "../types/CoinTypes";
import priceFormatter from "../helpers/priceFormatter";

interface CoinDetailsModalProps {
  coin: Coin;
  isOpen: boolean;
  toggleModal: () => void;
}

export default function CoinDetailsModal({
  coin,
  isOpen,
  toggleModal,
}: CoinDetailsModalProps) {
  const { currency } = useContext(CoinContext);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isSignedIn } = useAuth();
  const favorite = isFavorite(coin.id);

  const handleFavoriteClick = () => {
    if (!isSignedIn) {
      return;
    }
    if (favorite) {
      removeFavorite(coin.id);
    } else {
      addFavorite(coin);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950/25" />
        </Transition.Child>

        <div className="fixed inset-0 text-slate-700 dark:text-slate-200">
          <div className="grid min-h-full mx-2 place-items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-center w-full max-w-3xl gap-4 p-4 bg-white border rounded-md shadow-sm border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                <div className="flex justify-between items-center w-full">
                  {isSignedIn ? (
                    <button
                      onClick={handleFavoriteClick}
                      className="p-2 text-2xl text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                      {favorite ? <HiHeart /> : <HiOutlineHeart />}
                    </button>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="p-2 text-2xl text-emerald-500 hover:text-emerald-600 transition-colors">
                        <HiOutlineHeart />
                      </button>
                    </SignInButton>
                  )}
                  <button
                    className="p-2 font-medium transition-opacity hover:opacity-60"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                </div>

                <div className="w-full max-w-xl">
                  <CoinChart
                    name={coin.name}
                    data={coin.sparkline_in_7d.price}
                  />
                </div>

                <table className="w-full max-w-xl overflow-x-auto text-end">
                  <tbody className="text-sm divide-y divide-slate-200 whitespace-nowrap dark:divide-slate-700">
                    <tr>
                      <th className="py-4 font-medium text-start dark:text-slate-300">
                        Market Cap Rank:
                      </th>
                      <td>#{coin.market_cap_rank}</td>
                    </tr>

                    <tr>
                      <th className="py-4 font-medium text-start dark:text-slate-300">
                        {coin.name} Price:
                      </th>
                      <td>{priceFormatter(coin.current_price, currency)}</td>
                    </tr>

                    <tr>
                      <th className="py-4 font-medium text-start dark:text-slate-300">
                        Market Cap:
                      </th>
                      <td>{priceFormatter(coin.market_cap, currency)}</td>
                    </tr>

                    <tr>
                      <th className="py-4 font-medium text-start dark:text-slate-300">
                        24h Low:
                      </th>
                      <td>{priceFormatter(coin.low_24h, currency)}</td>
                    </tr>

                    <tr>
                      <th className="py-4 font-medium text-start dark:text-slate-300">
                        24h High:
                      </th>
                      <td>{priceFormatter(coin.high_24h, currency)}</td>
                    </tr>
                  </tbody>
                </table>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
