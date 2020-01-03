import { useEffect, ChangeEventHandler } from 'react'
import { osName } from './platform'
import isElectron from 'is-electron'

export type SelectChangeEventHandler = ChangeEventHandler<HTMLSelectElement>

export const useGlobalKeyDownHandler = (
  handler: (event: KeyboardEvent) => void
) => {
  return useEffect(() => {
    if (!isElectron()) {
      return
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [handler])
}

export function isWithGeneralCtrlKey(event: KeyboardEvent) {
  switch (osName) {
    case 'macos':
      return event.metaKey
    default:
      return event.ctrlKey
  }
}