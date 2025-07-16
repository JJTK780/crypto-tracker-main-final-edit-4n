// Hooks
import { useCallback, useEffect, useRef } from 'react'

type CallbackFn = () => void

type ReturnType = {
  reset: () => void
  clear: () => void
}

export default function useTimeout(
  callback: CallbackFn,
  delay: number
): ReturnType {
  const callbackRef = useRef<CallbackFn>(callback)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
