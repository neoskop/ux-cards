import { MainProps } from './types'
import styles from './styles.module.scss'

const Main = ({ children }: MainProps) => {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>{children}</div>
    </main>
  )
}

export default Main
