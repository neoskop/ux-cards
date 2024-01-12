export type CardProps = {
  id: number
  color: string
  title: string
  category: string
  description: string
  visual?: string
  compact?: boolean
  openCard?: (newIndex: number) => void
}
