import { useEffect } from 'react'

export const useKeyPress = (targetKey: string, callback: () => void) => {
  const onKeyup = (event: KeyboardEvent) => {
    if (event.key === targetKey) callback()
    console.log('key pressed')
  }

  useEffect(() => {
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])
}
