// Hooks
import { useEffect } from 'react'
import useTimeout from './useTimeout'

type CallbackFn = () => void

export default function useDebounce(
  callback: CallbackFn,
  delay: number,
  dependencies: unknown[]
) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}
