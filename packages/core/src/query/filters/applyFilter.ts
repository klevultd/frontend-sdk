import {
  KlevuApplyFilterQuery,
  KlevuDefaultOptions,
} from "../../connection/queryModels"

type Options = KlevuDefaultOptions

const defaults: Options = {
  id: "applyFilters",
}

type Filter = {
  key: string
  values: string[] | [number, number]
  settings: {
    singleSelect: boolean
  }
}

/**
 *
 * @category Queries
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options
 * @returns
 */
export function applyFilters(filters: Filter[], options?: Partial<Options>) {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuApplyFilterQuery = {
    id: params.id,
    typeOfRequest: undefined,
    filters: {
      applyFilters: {
        filters,
      },
    },
  }

  return query
}
