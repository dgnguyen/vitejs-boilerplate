export const emptyMarker = {
  dependancy: [],
  eventId: 90,
  eventName: '',
  id: 0,
  marketId: 0,
  marketName: '',
  maxRate: 0,
  minRate: 0,
  odds: null
}
export function prepareArray(array: any, size: any) {
  return array.reduce((chunks: any, item: any, i: any) => {
    if (i % size === 0 && i < 5) {
      chunks.push([item])
    } else {
      chunks[chunks.length - 1].push(item)
    }
    return chunks
  }, [])
}
