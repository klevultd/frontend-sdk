import Link from "next/link"
import styles from "./Header.module.css"

export function Header({ topnav }) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <img src="/klevu-developers-logo-blue.svg" />
        </a>
      </Link>
    </header>
  )
}
