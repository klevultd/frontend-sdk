import React from "react"
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"
import styles from "./Layout.module.css"

export function Layout({
  navigation,
  children,
  topnav,
}: {
  navigation: any
  children: any
  topnav: any
}) {
  return (
    <React.Fragment>
      <Header topnav={topnav} />
      <div className={styles.container}>
        {navigation ? (
          <aside>
            <Sidebar navigation={navigation} />
          </aside>
        ) : null}
        <main>{children}</main>
      </div>
    </React.Fragment>
  )
}
