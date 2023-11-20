import Card from '@/components/Card'
import Main from '@/components/Main'
import Pile from '@/components/Pile'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'

async function getCards() {
  return directus.request(readItems('Karten'))
}

export default async function Home() {
  const cards = await getCards()

  console.log(cards)

  return (
    <Main>
      <Pile
        items={cards.map(card => (
          <Card
            key={card.Titel}
            title={card.Titel}
            description={card.Beschreibung}
            visual={`${process.env.DIRECTUS_URL}/assets/${card.Icon}`}
          />
        ))}
      />
    </Main>
  )
}
