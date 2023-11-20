import Image from 'next/image'
import { MainProps } from './types'
import neoskopLogo from '@/assets/neoskop-logo.svg'
import styles from './styles.module.scss'

const Main = ({ children }: MainProps) => {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>{children}</div>
      <div className={styles.branding}>
        <a href="https://neoskop.de" target="_blank">
          <Image src={neoskopLogo} alt="Neoskop" width={150} height={42} />
        </a>
      </div>
    </main>
  )
}

export default Main
