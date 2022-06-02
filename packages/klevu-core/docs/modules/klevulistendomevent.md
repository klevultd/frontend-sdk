# klevulistendomevent
      
▸ **KlevuListenDomEvent**(`klevuDomEvent`, `callback`): () => `void`

Helper function to listen Klevu Dom events

**`example`** ```ts
import { KlevuDomEvents, KlevuListenDomEvent } from '@klevu/core'

// Event to listen
const stopListen = KlevuListenDomEvent(KlevuDomEvents.LastSearchUpdate, (event) => {
  console.log('last search updated!', event.detail)
})

// stop listening
stopListen();
```

@category KlevuEvents
@param klevuDomEvent What event to listen
@param callback What to do when event is fired
@returns Function to stop listening

#### Parameters

| Name | Type |
| :------ | :------ |
| `klevuDomEvent` | [`KlevuDomEvents`](enums/KlevuDomEvents.md) |
| `callback` | (`event`: `Event`) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[events/KlevuDomEvents.ts:42](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/events/KlevuDomEvents.ts#L42)

