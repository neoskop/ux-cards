'use client'

import { AnimatePresence, motion } from 'framer-motion'

import Header from '@/components/Header'
import Image from 'next/image'
import { MainProps } from './types'
import { fade } from '@/lib/animations/fade'
import neoskopLogo from '@/assets/neoskop-logo.svg'
import styles from './styles.module.scss'
import { useState } from 'react'

const Main = ({ children, overview }: MainProps) => {
  const [showOverview, setShowOverview] = useState(true)

  const handleOverview = () => {
    setShowOverview(!showOverview)
  }

  return (
    <main className={styles.main}>
      <Header action={handleOverview} />
      <AnimatePresence mode="wait">
        {showOverview ? (
          <motion.div
            {...fade}
            className={styles['overview-view']}
            key="overview"
          >
            {overview}
          </motion.div>
        ) : (
          <motion.div {...fade} className={styles['pile-view']} key="pile">
            <div className={styles.inner}>{children}</div>
            <div className={styles.branding}>
              <a href="https://neoskop.de" target="_blank">
                <Image
                  src={neoskopLogo}
                  alt="Neoskop"
                  width={132}
                  height={36}
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Main
