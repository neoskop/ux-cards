export type CardProps = {
  id: number
  color: string
  title?: string
  category: string
  description: string
  visual?: string
  author?: string
  authorPosition?: string
  template?: 'default' | 'compact' | 'quote'
  openCard?: (newIndex: number) => void
}
