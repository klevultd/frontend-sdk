# klevulistendomevent
      
▸ **KlevuListenDomEvent**(`klevuDomEvent`, `callback`): () => `void`

Helper function to listen Klevu Dom events

**`Example`**

```ts
import { KlevuDomEvents, KlevuListenDomEvent } from '@klevu/core'

// Event to listen
const stopListen = KlevuListenDomEvent(KlevuDomEvents.LastSearchUpdate, (event) => {
  console.log('last search updated!', event.detail)
})

// stop listening
stopListen();
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `klevuDomEvent` | [`KlevuDomEvents`](enums/KlevuDomEvents.md) | What event to listen |
| `callback` | (`event`: `Event`) => `void` | What to do when event is fired |

#### Returns

`fn`

Function to stop listening

▸ (): `void`

##### Returns

`void`

#### Defined in

[events/KlevuDomEvents.ts:47](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/events/KlevuDomEvents.ts#L47)

