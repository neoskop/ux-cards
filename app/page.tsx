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

export default async function Home() {
  const cards = await getCards()
  const categories = await getCategories()

  console.log(categories)

  const findCategory = (catId: number) => {
    const categoryName: string = categories.find(cat => cat.id === catId)

    return categoryName
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
