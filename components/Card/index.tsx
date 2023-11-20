import { CardProps } from './types'
import Image from 'next/image'
import styles from './styles.module.scss'

const Card = ({ title, description, visual }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      {visual && (
        <div className={styles.visual}>
          <Image src={visual} alt={styles.title} width={64} height={64} />
        </div>
      )}
    </div>
  )
}

export default Card
