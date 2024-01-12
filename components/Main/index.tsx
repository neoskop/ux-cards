'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CardKeys, CardType } from '@/app/page'
import { useEffect, useState } from 'react'

import Card from '../Card'
import { CardProps } from '../Card/types'
import { Grid } from 'react-feather'
import Header from '@/components/Header'
import Image from 'next/image'
import { MainProps } from './types'
import Overview from '../Overview'
import Pile from '../Pile'
import Search from '../Search'
import clsx from 'clsx'
import { fade } from '@/lib/animations/fade'
import neoskopLogo from '@/assets/neoskop-logo.svg'
import styles from './styles.module.scss'

const Main = ({ cards, categories, assetUrl }: MainProps) => {
  const [showOverview, setShowOverview] = useState(false)
  const [defaultIndex, setDefaultIndex] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCards, setFilteredCards] = useState<CardType[]>([])

  const handleOverview = () => {
    setShowOverview(!showOverview)
  }

  const searchCards = (term: string) => {
    setSearchTerm(term)
  }

  const openCard = (id: number) => {
    setDefaultIndex(id)
    setShowOverview(false)
  }

  const findCategory = (catId: number) => {
    const category: any = categories.find(cat => cat.id === catId)

    return category
  }

  const filterCards = (searchTerm: string) => {
    const catalog: Record<CardKeys, any>[] = cards.filter(card =>
      card.Titel.match(searchTerm)
    )

    setFilteredCards(catalog)
  }

  useEffect(() => {
    filterCards(searchTerm)

    console.log(cards)
    console.log(categories)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const overviewItems = filteredCards.map((card, i) => (
    <Card
      key={card.Titel}
      id={i}
      color={findCategory(card.Kategorie).Farbe}
      title={card.Titel}
      description={card.Beschreibung}
      category={findCategory(card.Kategorie).Name}
      visual={`${assetUrl}/assets/${card.Icon}`}
      openCard={openCard}
      compact
    />
  ))

  const pileItems = cards.map((card, i) => (
    <Card
      key={card.Titel}
      id={i}
      color={findCategory(card.Kategorie).Farbe}
      title={card.Titel}
      description={card.Beschreibung}
      category={findCategory(card.Kategorie).Name}
      visual={`${assetUrl}/assets/${card.Icon}`}
    />
  ))

  return (
    <main className={styles.main}>
      <Header>
        <AnimatePresence>
          {showOverview && (
            <motion.div {...fade}>
              <Search search={searchCards} />
            </motion.div>
          )}
        </AnimatePresence>
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
