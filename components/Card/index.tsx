import { fade } from '@/lib/animations/fade'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CSSProperties } from 'react'
import styles from './styles.module.scss'
import { CardProps } from './types'

const Card = ({
  id,
  color,
  title,
  category,
  description,
  visual,
  author,
  authorPosition,
  openCard,
  template = 'default'
}: CardProps) => {
  return (
    <motion.a
      key={title}
      className={clsx(styles.card, styles[template])}
      style={{ '--cat-color': color } as CSSProperties}
      onClick={() => openCard && openCard(id)}
      layout
      {...fade}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <h5 className={styles.category}>{category}</h5>
          {template === 'default' && (
            <>
              {title && <h2 className={styles.title}>{title}</h2>}
              <p className={styles.description}>{description}</p>
            </>
          )}
          {template === 'quote' && (
            <>
              <p className={styles.title}>“{description}”</p>
              {author && (
                <div className={styles.author}>
                  {author}
                  {authorPosition && <>, {authorPosition}</>}
                </div>
              )}
            </>
          )}
          {template === 'compact' && (
            <>
              {title ? (
                <h2 className={styles.title}>{title}</h2>
              ) : (
                <h2 className={styles.title}>{description}</h2>
              )}
            </>
          )}
        </div>
        {template === 'default' && visual && (
          <div className={styles.visual}>
            <Image src={visual} alt={styles.title} width={64} height={64} />
          </div>
        )}
      </div>
    </motion.a>
  )
}

export default Card
