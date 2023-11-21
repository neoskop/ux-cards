import { Grid } from 'react-feather'
import { HeaderProps } from './types'
import styles from './styles.module.scss'

const Header = ({ action }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>ux cards</div>
      <button className={styles.overview} onClick={action}>
        <Grid size={24} color="black" />
      </button>
    </header>
  )
}

export default Header
