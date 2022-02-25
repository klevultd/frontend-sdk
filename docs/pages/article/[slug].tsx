import { Layout } from "../../components/Layout/Layout"
import {
  FULL_ARTICLE_FRAGMENT,
  gql,
  NAVIGATION_FRAGMENT,
} from "../../lib/queries"
import { request } from "../../lib/datocms"
import { ArticleContent } from "../../components/ArticleContent/ArticleContent"
import { CoreApi } from "../../lib/coreapi"

export default function Article(props: {
  article: any
  navigation: any
  coreapidata: any
}) {
  return (
    <Layout navigation={props.navigation} coreapi={props.coreapidata}>
      <h1>{props.article.title}</h1>
      <ArticleContent content={props.article.content} />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const coreapidata = await CoreApi()
  const req = await request({
    query: ARTICLE,
    preview: Boolean(context.preview),
    variables: { slug: context.params.slug },
  })

  return {
    props: {
      navigation: req.navigation.children,
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
      params: { slug: a.slug },
    })),
    fallback: true,
  }
}

const ARTICLE = gql`
  query article($slug: String!) {
    navigation: article(filter: { slug: { eq: "frontpage" } }) {
      ...Navigation
    }

    article(filter: { slug: { eq: $slug } }) {
      ...FullArticle
    }
  }
  ${NAVIGATION_FRAGMENT}
  ${FULL_ARTICLE_FRAGMENT}
`

const ALL_SLUGS = gql`
  query allSlugs {
    allArticles {
      slug
    }
  }
`
