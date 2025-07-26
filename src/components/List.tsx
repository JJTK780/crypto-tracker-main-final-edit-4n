// Types
import { ReactNode } from 'react'

interface ListProps<T> {
  items: T[]
  render: (item: T, index?: number) => ReactNode
}

export default function List<T>({ items, render }: ListProps<T>) {
  return <>{items.map((item, index) => render(item, index))}</>
}
