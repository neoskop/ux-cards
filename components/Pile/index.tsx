'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useRef, useState } from 'react'

import PileItem from '@/components/PileItem'
import { PileProps } from './types'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useKeyPress } from '@/hooks/useKeypress'

const Pile = ({ items, defaultIndex = 0 }: PileProps) => {
  const [index, setIndex] = useState(defaultIndex)
  const indexRef = useRef(defaultIndex)

  const changeIndex = (newIndex: number) => {
    if (newIndex < items.length && newIndex > 0) {
      setIndex(newIndex)
      indexRef.current = newIndex
    } else if (newIndex < 0) {
      setIndex(items.length - 1)
      indexRef.current = items.length - 1
    } else {
      setIndex(0)
      indexRef.current = 0
    }
  }

  useKeyPress('ArrowDown', () => {
    changeIndex(indexRef.current + 1)
  })

  useKeyPress('ArrowRight', () => {
    changeIndex(indexRef.current + 1)
  })

  useKeyPress('ArrowUp', () => {
    changeIndex(indexRef.current - 1)
  })

  useKeyPress('ArrowLeft', () => {
    changeIndex(indexRef.current - 1)
  })

  return (
    <motion.div className={styles.pile}>
      <button
        className={clsx(styles.action, styles.prev)}
        onClick={() => changeIndex(indexRef.current - 1)}
      >
        <ArrowLeft color="white" />
      </button>
      <button
        className={clsx(styles.action, styles.next)}
        onClick={() => changeIndex(indexRef.current + 1)}
      >
        <ArrowRight color="white" />
      </button>
      <AnimatePresence initial={false}>
        <PileItem
          key={indexRef.current === items.length - 1 ? 0 : indexRef.current + 1}
          state="backCard"
          index={indexRef.current}
          setIndex={changeIndex}
        >
          {items[index === items.length - 1 ? 0 : indexRef.current + 1]}
        </PileItem>
        <PileItem
          key={indexRef.current}
          state="activeCard"
          index={indexRef.current}
          setIndex={changeIndex}
          drag="y"
        >
          {items[index]}
        </PileItem>
        <PileItem
          key={indexRef.current === 0 ? items.length - 1 : indexRef.current - 1}
          state="frontCard"
          index={indexRef.current}
          setIndex={changeIndex}
        >
          {
            items[
              indexRef.current === 0 ? items.length - 1 : indexRef.current - 1
            ]
          }
        </PileItem>
      </AnimatePresence>
    </motion.div>
  )
}

export default Pile
