import React from "react"
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"
import styles from "./Layout.module.css"

export function Layout({
  navigation,
  children,
  topnav,
  coreapi,
}: {
  navigation?: any
  children: any
  topnav?: any
  coreapi?: any
}) {
  return (
    <div className={styles.container}>
      <Header topnav={topnav} />
      <div className={styles.innercontainer}>
        {navigation ? (
          <aside>
            <Sidebar navigation={navigation} coreapi={coreapi} />
          </aside>
        ) : null}
        <main>{children}</main>
      </div>
    </div>
  )
}
