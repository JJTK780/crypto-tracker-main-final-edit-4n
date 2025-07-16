import { HiArrowSmUp as UpArrow } from 'react-icons/hi'
import { HiArrowSmDown as DownArrow } from 'react-icons/hi'
import { HiOutlineBell as BellIcon, HiOutlineTrash as TrashIcon } from 'react-icons/hi'

// Components
import CoinDetailsModal from './CoinDetailsModal'
import PriceAlertForm from './PriceAlertForm'

// Helpers
import priceFormatter from '../helpers/priceFormatter'
import formatPriceChange from '../helpers/formatPriceChange'

// Context
import { useContext } from 'react'
import { CoinContext } from '../context/CoinProvider'
import { usePriceAlerts } from '../context/PriceAlertProvider'

// Hooks
import { useState } from 'react'

// Types
import { Coin } from '../types/CoinTypes'

interface CoinCardProps {
  coin: Coin
}

export default function CoinCard({ coin }: CoinCardProps) {
  const { currency } = useContext(CoinContext)
  const { alerts, removeAlert } = usePriceAlerts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlertFormOpen, setIsAlertFormOpen] = useState(false)
  const isPriceChangePositive = coin.price_change_percentage_1h_in_currency > 0
  const priceChangeColor = isPriceChangePositive
    ? 'text-emerald-500'
    : 'text-red-500'

  const alertForCoin = alerts.find((alert) => alert.coinId === coin.id)

  function toggleModal() {
    setIsModalOpen((previous) => !previous)
  }

  function toggleAlertForm() {
    setIsAlertFormOpen((previous) => !previous)
  }

  const handleRemoveAlert = () => {
    if (alertForCoin) {
      removeAlert(alertForCoin.id)
    }
  }

  return (
    <>
      <div className="flex justify-between gap-4 p-4 bg-white border rounded-md shadow-sm border-slate-200 dark:bg-slate-900 dark:border-slate-700">
        <button className="flex gap-4 text-left" onClick={toggleModal}>
          <img
            className="w-12 aspect-square"
            src={coin.image}
            alt={coin.name}
          />

          <div>
            <h2 className="font-medium dark:text-slate-200">{coin.name}</h2>
            <span className="text-slate-400 dark:text-slate-400">{coin.symbol.toUpperCase()}</span>
          </div>
        </button>

        <div className="text-end flex items-center gap-3">
          <h3 className="font-medium dark:text-slate-200">
            {priceFormatter(coin.current_price, currency)}
          </h3>

          <div className={`flex items-center justify-end ${priceChangeColor}`}>
            {isPriceChangePositive ? <UpArrow /> : <DownArrow />}
            <span>
              {formatPriceChange(coin.price_change_percentage_1h_in_currency)}%
            </span>
          </div>

          {alertForCoin ? (
            <button
              onClick={handleRemoveAlert}
              aria-label="Remove price alert"
              className="text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400"
            >
              <TrashIcon size={20} />
            </button>
          ) : (
            <button
              onClick={toggleAlertForm}
              aria-label="Add price alert"
              className="text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400"
            >
              <BellIcon size={20} />
            </button>
          )}
        </div>
      </div>

      <CoinDetailsModal
        coin={coin}
        isOpen={isModalOpen}
        toggleModal={toggleModal}
      />

      {isAlertFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-md shadow-lg max-w-md w-full">
            <PriceAlertForm
              coinId={coin.id}
              coinName={coin.name}
              onClose={toggleAlertForm}
            />
            <button
              onClick={toggleAlertForm}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
