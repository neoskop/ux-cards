import { useEffect } from 'react'

export const useKeyPress = (targetKey: string, callback: () => void) => {
  const onKeyup = (event: KeyboardEvent) => {
    if (event.key === targetKey) callback()
  }

  useEffect(() => {
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])
}
