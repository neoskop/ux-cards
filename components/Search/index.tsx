'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Search as SearchIcon, XCircle } from 'react-feather'
import { useEffect, useRef, useState } from 'react'

import { SearchProps } from './types'
import clsx from 'clsx'
import { fade } from '@/lib/animations/fade'
import styles from './styles.module.scss'

const Search = ({ search }: SearchProps) => {
  const [value, setValue] = useState('')
  const [showInput, setInput] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = () => {
    setInput(true)
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100)
  }

  const resetSearch = () => {
    setValue('')
    setInput(false)
  }

  useEffect(() => {
    search(value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className={clsx(styles.search, showInput && styles.active)}>
      <AnimatePresence mode="wait">
        {showInput ? (
          <motion.button
            onClick={resetSearch}
            className={styles.button}
            {...fade}
          >
            <XCircle size={24} color="black" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleInput}
            className={styles.button}
            {...fade}
          >
            <SearchIcon size={24} color="black" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className={clsx(styles.container, showInput && styles.visible)}>
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={e => setValue(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  )
}

export default Search
