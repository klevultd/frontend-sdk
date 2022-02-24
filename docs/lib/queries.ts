// hax to get syntax coloring in vscode
export const gql = String.raw

export const NAVIGATION_FRAGMENT = gql`
  fragment Navigation on ArticleRecord {
    id
    title
    slug
    children {
      id
      title
      slug
      children {
        id
        title
        slug
        children {
          id
          title
          slug
        }
      }
    }
  }
`

export const FULL_ARTICLE_FRAGMENT = gql`
  fragment FullArticle on ArticleRecord {
    id
    title
    content {
      blocks {
        __typename
        id
        ... on CodesandboxRecord {
          options
          sandboxId
        }
      }
      links {
        __typename
        id
        ... on ArticleRecord {
          title
          slug
        }
      }
      value
    }
  }
`
