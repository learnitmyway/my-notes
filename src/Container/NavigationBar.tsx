import React from 'react'

import hamburger from './menu.svg'
import styles from './NavigationBar.module.css'

export interface Props {
  handleClick: () => void
}

export default function NavigationBar(props: Props) {
  return (
    <nav className={styles.nav}>
      <img
        onClick={props.handleClick}
        className={styles.img}
        src={hamburger}
        alt="hamburger menu"
      />
    </nav>
  )
}
