import Link from "next/link"
import styles from "./Sidebar.module.css"
import groupBy from "lodash.groupby"
import React from "react"

type NavItem = {
  isContainer?: boolean
  isCoreApi?: boolean
  slug: string
  title: string
  children?: NavItem[]
}

export function Sidebar(props: { navigation: NavItem[]; coreapi: any }) {
  const nav: NavItem[] = [...props.navigation]

  const coreapiitem = nav.find((i) => i.slug === "klevu-core-api")
  if (coreapiitem) {
    const grouped = groupBy(props.coreapi.children, "kindString")
    coreapiitem.children = []
    for (const [key, children] of Object.entries(grouped)) {
      coreapiitem.children.push({
        isContainer: true,
        title: key,
        slug: key,
        children: children
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((i) => ({
            isCoreApi: true,
            slug: i.name,
            title: i.name,
          })),
      })
    }
  }

  return (
    <nav className={styles.nav}>
      <RecursiveMenu nav={nav} />
    </nav>
  )
}

function RecursiveMenu({ nav }) {
  return (
    <ul>
      {nav.map((item, index) => (
        <li key={index}>
          {item.isContainer ? (
            <React.Fragment>{item.title}</React.Fragment>
          ) : (
            <Link
              href={
                item.isCoreApi
                  ? `/coreapi/${item.slug}`
                  : item.navigationRoot
                  ? `/article/${item.navigationRoot.slug}/${item.slug}`
                  : `/article/${item.slug}`
              }
            >
              <a>{item.title}</a>
            </Link>
          )}
          {item.children && item.children.length > 0 ? (
            <RecursiveMenu nav={item.children} />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
