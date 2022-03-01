import { Layout } from "../../components/Layout/Layout"
import { gql, NAVIGATION_FRAGMENT, TOPNAV_FRAGMENT } from "../../lib/queries"

import { ArticleContent } from "../../components/ArticleContent/ArticleContent"
import { CoreApi } from "../../lib/coreapi"
import { request } from "../../lib/datocms"

export default function CoreApiPage(props: {
  apiItem: any
  navigation: any
  coreapidata: any
  topnav: any
}) {
  const apiItem = props.apiItem
  return (
    <Layout
      navigation={props.navigation}
      coreapi={props.coreapidata}
      topnav={props.topnav}
    >
      <h1>{apiItem.name}</h1>
      <pre>{JSON.stringify(apiItem, undefined, 2)}</pre>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const api = await CoreApi()
  const apiItem = api.children.find((i) => i.name === context.params.name)
  const req = await request({
    query: NAV,
  })
  return {
    props: {
      apiItem,
      coreapidata: api,
      navigation: req.navigation.children,
      topnav: req.topnav.children,
    },
  }
}

export async function getStaticPaths() {
  const api = await CoreApi()
  return {
    paths: api.children.map((a) => ({
      params: { name: a.name },
    })),
    fallback: true,
  }
}

const NAV = gql`
  query coreapi {
    navigation: article(filter: { slug: { eq: "frontpage" } }) {
      ...Navigation
    }

    topnav: article(filter: { slug: { eq: "frontpage" } }) {
      ...TopNav
    }
  }
  ${NAVIGATION_FRAGMENT}
  ${TOPNAV_FRAGMENT}
`
