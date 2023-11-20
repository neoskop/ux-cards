import { Grid } from 'react-feather'
import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>ux cards</div>
      <button className={styles.overview}>
        <Grid size={24} color="black" />
      </button>
    </header>
  )
}

export default Header
