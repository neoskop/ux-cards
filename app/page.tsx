import Card from '@/components/Card'
import Main from '@/components/Main'
import Pile from '@/components/Pile'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'

async function getCards() {
  return directus.request(readItems('Karten'))
}

async function getCategories() {
  return directus.request(readItems('Lernfelder'))
}

export type Card = {
  Titel: string
  Kategorie: string
  Beschreibung: string
  Icon: string
}

export default async function Home() {
  const cards: Record<string, any>[] = await getCards()
  const categories: Record<string, any>[] = await getCategories()

  console.log(categories)

  const findCategory = (catId: number) => {
    const category: any = categories.find(cat => cat.id === catId)

    return category
  }

  return (
    <Main>
      <Pile
        items={cards.map(card => (
          <Card
            key={card.Titel}
            color={findCategory(card.Kategorie).Farbe}
            title={card.Titel}
            description={card.Beschreibung}
            category={findCategory(card.Kategorie).Name}
            visual={`${process.env.DIRECTUS_URL}/assets/${card.Icon}`}
          />
        ))}
      />
    </Main>
  )
}
