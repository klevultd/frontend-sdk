# moistartoptions
      
Ƭ **MoiStartOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `mode?` | [`MoiChatModes`](moichatmodes.md) | The mode to use. If undefined will use the default Moi mode |
| `onAction?` | (`action`: [`MoiActionsMessage`](moiactionsmessage.md)[``"actions"``][``"actions"``][`number`]) => `boolean` \| `void` | Action listener for actions |
| `onMessage?` | () => `void` | Called when a message is received from Moi |
| `onRedirect?` | (`url`: `string`) => `void` | Custom redirect handler |
| `pqaWidgetId?` | `string` | PQA widgetId for the PQA application |
| `productId?` | `string` | productId for the PQA application |
| `settings?` | { `alwaysStartConversation?`: `boolean` ; `configOverride?`: [`KlevuConfig`](classes/KlevuConfig.md)  } | - |
| `settings.alwaysStartConversation?` | `boolean` | Always sends the initial message to Moi even if there are no messages stored for that case |
| `settings.configOverride?` | [`KlevuConfig`](classes/KlevuConfig.md) | Override the config |
| `url?` | `string` | URL for the PQA application |

#### Defined in

[connection/moi/moi.ts:183](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L183)

