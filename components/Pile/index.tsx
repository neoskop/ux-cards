'use client'

import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'react-feather'

import PileItem from '@/components/PileItem'
import { PileProps } from './types'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useState } from 'react'

const Pile = ({ items }: PileProps) => {
  const [index, setIndex] = useState(0)

  const changeIndex = (newIndex: number) => {
    if (newIndex < items.length && newIndex > 0) {
      setIndex(newIndex)
    } else if (newIndex < 0) {
      setIndex(items.length - 1)
    } else {
      setIndex(0)
    }
  }

  return (
    <motion.div className={styles.pile}>
      <button
        className={clsx(styles.action, styles.prev)}
        onClick={() => changeIndex(index - 1)}
      >
        <ArrowLeft color="white" />
      </button>
      <button
        className={clsx(styles.action, styles.next)}
        onClick={() => changeIndex(index + 1)}
      >
        <ArrowRight color="white" />
      </button>
      <AnimatePresence initial={false}>
        <PileItem
          key={index === items.length - 1 ? 0 : index + 1}
          state="backCard"
          index={index}
          setIndex={changeIndex}
        >
          {items[index === items.length - 1 ? 0 : index + 1]}
        </PileItem>
        <PileItem
          key={index}
          state="activeCard"
          index={index}
          setIndex={changeIndex}
          drag="y"
        >
          {items[index]}
        </PileItem>
        <PileItem
          key={index === 0 ? items.length - 1 : index - 1}
          state="frontCard"
          index={index}
          setIndex={changeIndex}
        >
          {items[index === 0 ? items.length - 1 : index - 1]}
        </PileItem>
      </AnimatePresence>
    </motion.div>
  )
}

export default Pile
