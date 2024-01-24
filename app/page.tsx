import Main from '@/components/Main'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'

async function getCards() {
  return directus.request(readItems('Karten'))
}

async function getCategories() {
  return directus.request(readItems('Lernfelder'))
}

export type CardKeys =
  | 'Titel'
  | 'Kategorie'
  | 'Beschreibung'
  | 'Icon'
  | 'Autor'
  | 'Autor_Position'
  | 'id'

export type CardType = {
  Kategorie: number
  Titel?: string
  Beschreibung: string
  Icon?: string
  Autor?: string
  Autor_Position?: string
  id: number
}

export type CategoryType = {
  Name: string
  Farbe: string
}

export default async function Home() {
  const cards: Record<CardKeys, any>[] = await getCards()
  const categories: Record<string, any>[] = await getCategories()

  return (
    <Main
      cards={cards}
      categories={categories}
      assetUrl={process.env.DIRECTUS_URL}
    />
  )
}
