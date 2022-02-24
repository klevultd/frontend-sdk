import Link from "next/link"
import styles from "./Sidebar.module.css"

export function Sidebar(props: { navigation: any }) {
  return (
    <nav className={styles.nav}>
      <ul>
        {props.navigation.map((item, index) => (
          <li key={index}>
            <Link href={`/article/${item.slug}`}>
              <a>{item.title}</a>
            </Link>
            {item.children ? (
              <ul>
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <Link href={`/article/${child.slug}`}>
                      <a>{child.title}</a>
                    </Link>
                    {child.children ? (
                      <ul>
                        {child.children.map((subchild, subchildIndex) => (
                          <li key={subchildIndex}>
                            <Link href={`/article/${subchild.slug}`}>
                              <a>{subchild.title}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}
