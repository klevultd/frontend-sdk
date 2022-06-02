# klevubasequerysettingsquery
      
Ƭ **KlevuBaseQuerySettingsQuery**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryPath?` | `string` | Specify the name of the category to retrieve results from, in the same case and format as it is indexed with Klevu.  For nested categories, use the ; character to separate the hierarchy. For example, for 'Mens > Shoes > Trainers and Sneakers' you would specify: Mens;Shoes;Trainers and Sneakers. |
| `term?` | `string` | This is the phrase to be searched. It can be any free text up-to 128 characters long. If a longer string is provided it is automatically truncated after the first 128 characters. |

#### Defined in

[models/KlevuBaseQuerySettingsQuery.ts:1](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/models/KlevuBaseQuerySettingsQuery.ts#L1)

