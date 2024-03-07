import CategoryPage from "./categoryPage"

export default async function Category(props: any) {
  return <CategoryPage categorySlug={props.params.slug} />
}
