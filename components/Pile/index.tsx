'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import Card from '../Card'
import PileItem from '@/components/PileItem'
import { PileProps } from './types'
import styles from './styles.module.scss'

const Pile = ({ items }: PileProps) => {
  const [index, setIndex] = useState(0)

  const changeIndex = (newIndex: number) => {
    if (newIndex < items.length) {
      setIndex(newIndex)
    } else {
      setIndex(0)
    }
  }

  return (
    <motion.div className={styles.pile}>
      <AnimatePresence initial={false}>
        <PileItem
          key={index === items.length - 1 ? 0 : index + 1}
          frontCard={false}
          index={index}
          setIndex={changeIndex}
        >
          {items[index + 1]}
        </PileItem>
        <PileItem
          key={index}
          frontCard={true}
          index={index}
          setIndex={changeIndex}
          drag="x"
        >
          {items[index]}
        </PileItem>
      </AnimatePresence>
    </motion.div>
  )
}

export default Pile
