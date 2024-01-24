'use client'

import { CardKeys, CardType } from '@/app/page'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import neoskopLogo from '@/assets/neoskop-logo.svg'
import Header from '@/components/Header'
import { capitalizeFirstLetter } from '@/helper/capitalizeFirstLetter'
import { fade } from '@/lib/animations/fade'
import Image from 'next/image'
import { Grid } from 'react-feather'
import Card from '../Card'
import Overview from '../Overview'
import Pile from '../Pile'
import Search from '../Search'
import styles from './styles.module.scss'
import { MainProps } from './types'

const Main = ({ cards, categories, assetUrl }: MainProps) => {
  const [showOverview, setShowOverview] = useState(false)
  const [defaultIndex, setDefaultIndex] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCards, setFilteredCards] = useState<CardType[]>([])

  const handleOverview = () => {
    setShowOverview(!showOverview)
  }

  const searchCards = (term: string) => {
    !showOverview && setShowOverview(true)
    setSearchTerm(term)
  }

  const openCard = (id: number) => {
    setDefaultIndex(id - 1)
    setShowOverview(false)
  }

  const findCategory = (catId: number) => {
    const category: any = categories.find(cat => cat.id === catId)

    return category
  }

  const filterCards = (searchTerm: string) => {
    const catalog: Record<CardKeys, any>[] = cards.filter(card => {
      if (card.Titel?.match(capitalizeFirstLetter(searchTerm))) {
        return true
      } else if (card.Beschreibung?.match(capitalizeFirstLetter(searchTerm))) {
        return true
      } else if (card.Autor?.match(capitalizeFirstLetter(searchTerm))) {
        return true
      } else {
        return false
      }
    })

    setFilteredCards(catalog)
  }

  useEffect(() => {
    console.log(showOverview)
  }, [showOverview])

  useEffect(() => {
    filterCards(searchTerm)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const overviewItems = filteredCards.map((card, i) => (
    <Card
      key={`card-${card.id}`}
      id={card.id}
      color={findCategory(card.Kategorie)?.Farbe}
      title={card.Titel}
      description={card.Beschreibung}
      category={findCategory(card.Kategorie)?.Name}
      visual={`${assetUrl}/assets/${card.Icon}`}
      author={card.Autor}
      authorPosition={card.Autor_Position}
      openCard={openCard}
      template="compact"
    />
  ))

  const pileItems = cards.map((card, i) => (
    <Card
      key={`card-${card.id}`}
      id={card.id}
      color={findCategory(card.Kategorie)?.Farbe}
      title={card.Titel}
      description={card.Beschreibung}
      category={findCategory(card.Kategorie)?.Name}
      author={card.Autor}
      authorPosition={card.Autor_Position}
      visual={`${assetUrl}/assets/${card.Icon}`}
      template={card.Kategorie === 3 ? 'quote' : 'default'}
    />
  ))

  return (
    <main className={styles.main}>
      <Header>
        <Search search={searchCards} />
        <button onClick={handleOverview}>
          <Grid size={24} color="black" />
        </button>
      </Header>
      <AnimatePresence mode="wait">
        {showOverview ? (
          <motion.div
            {...fade}
            className={styles['overview-view']}
            key="overview"
          >
            <Overview items={overviewItems} />
          </motion.div>
        ) : (
          <motion.div {...fade} className={styles['pile-view']} key="pile">
            <div className={styles.inner}>
              <Pile items={pileItems} defaultIndex={defaultIndex} />
            </div>
            <div className={styles.branding}>
              <a href="https://neoskop.de" target="_blank">
                <Image
                  src={neoskopLogo}
                  alt="Neoskop"
                  width={132}
                  height={36}
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Main
