'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'

import { PileItemProps } from './types'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useState } from 'react'

const PileItem = ({
  children,
  setIndex,
  index,
  state,
  drag
}: PileItemProps) => {
  const [exitX, setExitX] = useState(0)

  const x = useMotionValue(0)
  const scale = useTransform(x, [-150, 0, 150], [0.75, 1, 0.75])
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15], {
    clamp: false
  })

  const variants = {
    backCard: {
      initial: { scale: 0, y: 100, opacity: 0 },
      animate: { scale: 0.75, y: -80, opacity: 0.5 }
    },
    activeCard: {
      animate: { scale: 1, y: 0, opacity: 1 },
      exit: (custom: number) => ({
        y: custom,
        opacity: 0,
        scale: 0.5
      })
    },
    frontCard: {
      initial: { scale: 1, y: 0, opacity: 1 },
      animate: { scale: 1.5, y: '100vh', opacity: 0.5 }
    }
  }

  function handleDragEnd(_: any, info: any) {
    if (info.offset.y < -100) {
      setExitX(-250)
      setIndex(index - 1)
    }
    if (info.offset.y > 100) {
      setExitX(250)
      setIndex && setIndex(index + 1)
    }
  }

  return (
    <motion.div
      className={clsx(styles.pileItem, styles[state])}
      style={{
        x,
        rotate,
        cursor: 'grab'
      }}
      whileTap={{ cursor: 'grabbing' }}
      // Dragging
      drag={drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      // Animation
      variants={variants[state]}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div className={styles.inner} style={{ scale }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default PileItem
