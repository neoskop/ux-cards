import { AnimatePresence } from 'framer-motion'
import { OverviewProps } from './types'
import styles from './styles.module.scss'

const Overview = ({ items }: OverviewProps) => {
  return (
    <div className={styles.overview}>
      <AnimatePresence>{items}</AnimatePresence>
    </div>
  )
}

export default Overview
