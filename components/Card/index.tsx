import { CSSProperties } from 'react'
import { CardProps } from './types'
import Image from 'next/image'
import clsx from 'clsx'
import { fade } from '@/lib/animations/fade'
import { motion } from 'framer-motion'
import styles from './styles.module.scss'

const Card = ({
  id,
  color,
  title,
  category,
  description,
  visual,
  openCard,
  compact = false
}: CardProps) => {
  console.log(color)

  return (
    <motion.a
      key={title}
      className={clsx(styles.card, compact && styles.compact)}
      style={{ '--cat-color': color } as CSSProperties}
      onClick={() => openCard && openCard(id)}
      layout
      {...fade}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <h5 className={styles.category}>{category}</h5>
          <h2 className={styles.title}>{title}</h2>
          {!compact && <p className={styles.description}>{description}</p>}
        </div>
        {!compact && visual && (
          <div className={styles.visual}>
            <Image src={visual} alt={styles.title} width={64} height={64} />
          </div>
        )}
      </div>
    </motion.a>
  )
}

export default Card
