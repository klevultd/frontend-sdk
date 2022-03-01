import { Layout } from "../../components/Layout/Layout"
import {
  FULL_ARTICLE_FRAGMENT,
  gql,
  NAVIGATION_FRAGMENT,
  TOPNAV_FRAGMENT,
} from "../../lib/queries"
import { request } from "../../lib/datocms"
import { ArticleContent } from "../../components/ArticleContent/ArticleContent"
import { CoreApi } from "../../lib/coreapi"

export default function Article(props: {
  article: any
  navigation: any
  coreapidata: any
  topnav: any
}) {
  return (
    <Layout
      navigation={props.navigation}
      coreapi={props.coreapidata}
      topnav={props.topnav}
    >
      <h1>{props.article.title}</h1>
      <ArticleContent content={props.article.content} />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const coreapidata = await CoreApi()
  const [lastSlug] = context.params.slug.slice(-1)
  console.log(lastSlug)
  const firstSlug = context.params.slug[0]
  const req = await request({
    query: ARTICLE,
    preview: Boolean(context.preview),
    variables: { slug: lastSlug },
  })

  const navreq = await request({
    query: NAV,
    preview: Boolean(context.preview),
    variables: {
      parent: firstSlug,
    },
  })

  console.log(req)

  return {
    props: {
      navigation: navreq.navigation.children,
      topnav: navreq.topnav.children,
      article: req.article || null,
      coreapidata,
    },
  }
}

export async function getStaticPaths() {
  const req = await request({
    query: ALL_SLUGS,
  })

  return {
    paths: req.allArticles.map((a) => ({
      params: {
        slug: a.navigationRoot ? [a.navigationRoot.slug, a.slug] : [a.slug],
      },
    })),
    fallback: true,
  }
}

const ARTICLE = gql`
  query article($slug: String!) {
    article(filter: { slug: { eq: $slug } }) {
      ...FullArticle
    }
  }
  ${FULL_ARTICLE_FRAGMENT}
`

const NAV = gql`
  query nav($parent: String!) {
    navigation: article(filter: { slug: { eq: $parent } }) {
      ...Navigation
    }

    topnav: article(filter: { slug: { eq: "frontpage" } }) {
      ...TopNav
    }
  }
  ${NAVIGATION_FRAGMENT}
  ${TOPNAV_FRAGMENT}
`

const ALL_SLUGS = gql`
  query allSlugs {
    allArticles {
      slug

      navigationRoot {
        slug
      }
    }
  }
`
