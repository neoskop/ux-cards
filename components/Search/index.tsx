'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Search as SearchIcon, XCircle } from 'react-feather'

import { fade } from '@/lib/animations/fade'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { SearchProps } from './types'

const Search = ({ search }: SearchProps) => {
  const [value, setValue] = useState('')
  const [showInput, setInput] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = () => {
    setInput(true)
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100)
  }

  const handleValue = (e: any) => {
    setValue(e.target.value)
    search(e.target.value)
  }

  const resetSearch = () => {
    setValue('')
    setInput(false)
  }

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
          onChange={handleValue}
          className={styles.input}
        />
      </div>
    </div>
  )
}

export default Search
