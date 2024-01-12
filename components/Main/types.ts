import { CardKeys, CardType, CategoryType } from '@/app/page'

export type MainProps = {
  cards: Record<CardKeys, any>[]
  categories: Record<string, any>[]
  assetUrl?: string
}
