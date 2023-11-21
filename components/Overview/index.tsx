import { OverviewProps } from './types'
import styles from './styles.module.scss'

const Overview = ({ items }: OverviewProps) => {
  return <div className={styles.overview}>{items}</div>
}

export default Overview
