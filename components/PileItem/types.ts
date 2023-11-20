export type PileItemProps = {
  children: React.ReactNode
  index: number
  setIndex: (a: number) => void
  state: 'backCard' | 'activeCard' | 'frontCard'
  drag?: any
}
