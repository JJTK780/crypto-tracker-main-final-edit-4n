// Components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Context
import { useContext } from 'react'
import { CoinContext } from '../context/CoinProvider'

// Helpers
import getLast7DaysDates from '../helpers/getLast7DaysDates'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
)

interface CoinChartProps {
  name: string
  data: number[]
}

export default function CoinChart({ name, data }: CoinChartProps) {
  const { currency } = useContext(CoinContext)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Last 7d ${name || 'coin'} price`,
        color: 'rgba(51, 65, 85, 0.9)'
      },
      tooltip: {
        displayColors: false,
        backgroundColor: 'rgba(15, 23, 42, 0.8)'
      }
    }
  }

  const config = {
    labels: getLast7DaysDates(),
    datasets: [
      {
        data,
        label: currency,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgb(16, 185, 129)'
      }
    ]
  }

  return <Line options={options} data={config} />
}
