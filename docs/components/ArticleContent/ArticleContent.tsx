import Link from "next/link"
import { StructuredText } from "react-datocms"
import Codesandbox from "./Codesandbox"

export function ArticleContent({ content }) {
  return (
    <StructuredText
      data={content as any}
      renderInlineRecord={({ record }) => {
        switch (record.__typename) {
          case "ArticleRecord":
            return <Link href={`/article/${record.slug}`}>{record.title}</Link>
          default:
            return null
        }
      }}
      renderLinkToRecord={({ record, children }) => {
        switch (record.__typename) {
          case "ArticleRecord":
            return (
              <Link href={`/article/${record.slug}`}>
                <a>{children}</a>
              </Link>
            )
          default:
            return null
        }
      }}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case "CodesandboxRecord":
            return (
              <Codesandbox
                sandboxId={record.sandboxId}
                options={record.options}
              />
            )
        }
        console.log(record)
        return null
      }}
    />
  )
}
