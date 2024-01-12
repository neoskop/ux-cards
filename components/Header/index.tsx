import { HeaderProps } from './types'
import styles from './styles.module.scss'

const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>ux cards</div>
      <div className={styles.actions}>{children}</div>
    </header>
  )
}

export default Header
