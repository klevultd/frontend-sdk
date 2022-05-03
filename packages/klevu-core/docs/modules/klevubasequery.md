# klevubasequery
      
Ƭ **KlevuBaseQuery**: `Object`

Generic

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `boost?` | { `filters?`: { `key`: `string` ; `values`: `string`[] ; `weight`: `number`  }[] ; `keywords?`: { `phrase`: `string` ; `weight`: `number`  }[] ; `records?`: { `id`: `string` ; `weight`: `number`  }[]  } | If you have already built up a profile of your customer and would like to use what you know about them to promote certain results, you can use the boost object within each record query.  There are three ways the records can be boosted:  filter conditions keywords or phrases IDs of specific records For example let's say you have an online store with an area where customers can log in.  From your stores purchase history, you know that one customer is particularly interested in the brand 'KKE'.  From your analytics data, you also know the same customer also looked at the product detail page of the product with ID: '31366487375934' many times.  Finally, you have an area where customers can specify keywords of their interests, and this customer wrote 'comfortable'.  As a merchant with all of this information available, you can build up a profile about this customer. The sample to the right shows how you would convey this information to Klevu during a search.  To find out more about how boosting works with your existing merchandising rules, please read this article on How [Personalisation Works](https://help.klevu.com/support/solutions/articles/5000871357-how-does-it-work-). |
| `boost.filters?` | { `key`: `string` ; `values`: `string`[] ; `weight`: `number`  }[] | Specify filter values to apply a boosting score to. They key is the unique identifier of the attribute, eg. Color. Each of the values represents the value of that filter to boost, eg. red or blue. |
| `boost.keywords?` | { `phrase`: `string` ; `weight`: `number`  }[] | Specify keywords or phrases to apply a boosting score to, for example "comfortable". |
| `boost.records?` | { `id`: `string` ; `weight`: `number`  }[] | Specify the Klevu ID of any records to apply a boosting score to. |
| `filters?` | [`KlevuListFilter`](klevulistfilter.md) & [`KlevuApplyFilter`](klevuapplyfilter.md) | - |
| `id` | `string` | - |
| `isFallbackQuery?` | `boolean` | - |
| `settings?` | [`KlevuBaseQuerySettings`](klevubasequerysettings.md) | - |
| `typeOfRequest` | [`KlevuTypeOfRequest`](enums/KlevuTypeOfRequest.md) | - |

#### Defined in

[models/KlevuBaseQuery.ts:11](https://github.com/klevultd/frontend-sdk/blob/0515b77/packages/klevu-core/src/models/KlevuBaseQuery.ts#L11)

