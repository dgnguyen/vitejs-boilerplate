import { useEffect, useRef, useState } from 'react'

export default function useSetHeightInfiniteScroll() {
  const inputRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<any>(undefined)

  useEffect(() => {
    if (inputRef?.current)
      setHeight(inputRef?.current.offsetHeight || undefined)
  }, [inputRef])

  return {
    height,
    inputRef,
  }
}
