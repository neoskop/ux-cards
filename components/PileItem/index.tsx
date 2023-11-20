'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'

import { PileItemProps } from './types'
import styles from './styles.module.scss'
import { useState } from 'react'

const PileItem = ({
  children,
  setIndex,
  index,
  frontCard,
  drag
}: PileItemProps) => {
  const [exitX, setExitX] = useState(0)

  const x = useMotionValue(0)
  const scale = useTransform(x, [-150, 0, 150], [0.75, 1, 0.75])
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15], {
    clamp: false
  })

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom: number) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 }
    })
  }
  const variantsBackCard = {
    initial: { scale: 0, y: 105, opacity: 0 },
    animate: { scale: 0.75, y: 30, opacity: 0.5 }
  }

  function handleDragEnd(_: any, info: any) {
    if (info.offset.x < -100) {
      setExitX(-250)
      setIndex(index + 1)
    }
    if (info.offset.x > 100) {
      setExitX(250)
      setIndex && setIndex(index + 1)
    }
  }

  return (
    <motion.div
      className={styles.pileItem}
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
      variants={frontCard ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={
        frontCard
          ? { type: 'spring', stiffness: 300, damping: 20 }
          : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
      }
    >
      <motion.div className={styles.inner} style={{ scale }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default PileItem
