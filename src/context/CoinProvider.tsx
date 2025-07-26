// Hooks
import { ReactNode, createContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// Libs
import axios from 'axios'

// Types
import {
  CoinContextType,
  CoinState,
  Currencies,
  Coin,
  TrendingCoin
} from '../types/CoinTypes'

export const CoinContext = createContext<CoinContextType>(null!)

const TRENDING_API_URL = 'https://api.coingecko.com/api/v3/search/trending'

interface CoinProviderProps {
  children: ReactNode
}

export default function CoinProvider({ children }: CoinProviderProps) {
  const [currency, setCurrency] = useState<Currencies>('EUR')
  const [trending, setTrending] = useState<TrendingCoin[]>([])
  const [coins, setCoins] = useState<Coin[]>([])

  const COINS_API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h&locale=en`

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: () => axios.get(TRENDING_API_URL),
    onSuccess: (response) => {
      const data = response.data.coins.map((coin: { item: TrendingCoin }) => ({
        ...coin.item
      }))
      setTrending(data)
    }
  })

  const { status } = useQuery({
    queryKey: ['coins', trendingQuery.data, currency],
    queryFn: () => axios.get(COINS_API_URL),
    onSuccess: (response) => {
      setCoins(response.data)
    },
    enabled: trendingQuery.data !== null
  })

  function updateCurrency(currency: Currencies) {
    setCurrency(currency)
  }

  const data: CoinState = {
    trending,
    coins
  }

  return (
    <CoinContext.Provider value={{ data, status, currency, updateCurrency }}>
      {children}
    </CoinContext.Provider>
  )
}
