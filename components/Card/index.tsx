import { CSSProperties } from 'react'
import { CardProps } from './types'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './styles.module.scss'

const Card = ({
  color,
  title,
  category,
  description,
  visual,
  compact = false
}: CardProps) => {
  console.log(color)

  return (
    <div
      className={clsx(styles.card, compact && styles.compact)}
      style={{ '--cat-color': color } as CSSProperties}
    >
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
  )
}

export default Card
