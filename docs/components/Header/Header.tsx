import Link from "next/link"
import styles from "./Header.module.css"

export function Header({ topnav }) {
  return (
    <div>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <h1>Klevu documentation</h1>
          </a>
        </Link>
      </header>
    </div>
  )
}
