// hax to get syntax coloring in vscode
export const gql = String.raw

export const NAVIGATION_FRAGMENT = gql`
  fragment Navigation on ArticleRecord {
    id
    title
    slug
    navigationRoot {
      slug
    }
    children {
      id
      title
      slug
      navigationRoot {
        slug
      }
      children {
        id
        title
        slug
        navigationRoot {
          slug
        }
        children {
          id
          title
          slug
          navigationRoot {
            slug
          }
        }
      }
    }
  }
`

export const TOPNAV_FRAGMENT = gql`
  fragment TopNav on ArticleRecord {
    children {
      id
      title
      slug
      children {
        id
        title
        slug
        linkDescription
        linkIcon {
          url
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
        ... on CodesandboxRecord {
          id
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
    navigationRoot {
      slug
    }
  }
`
