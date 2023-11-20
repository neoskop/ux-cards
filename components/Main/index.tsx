import Header from '@/components/Header'
import Image from 'next/image'
import { MainProps } from './types'
import neoskopLogo from '@/assets/neoskop-logo.svg'
import styles from './styles.module.scss'

const Main = ({ children }: MainProps) => {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.inner}>{children}</div>
      <div className={styles.branding}>
        <a href="https://neoskop.de" target="_blank">
          <Image src={neoskopLogo} alt="Neoskop" width={132} height={36} />
        </a>
      </div>
    </main>
  )
}

export default Main
