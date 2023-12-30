import { MouseEvent } from 'react'

export const onStopPropagationHandler = (e: MouseEvent<HTMLDivElement>) => {
  e.stopPropagation()
}
