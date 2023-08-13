# `react-array-utils`

Utilities to make dealing with state arrays easier.

## `useArrayState`

Creates functions to add, remove, set, and insert to the array.

### Example Usage

```tsx
const [state, setState] = useState(['milk', 'eggs', 'pipes']);
const { add, remove, set, insert } = useArrayState(state, setState);

add('Cat'); // ['milk', 'eggs', 'pipes', 'Cat']
remove(2); // ['milk', 'eggs', 'Cat']
set(1, 'dozen eggs'); // ['milk', 'dozen eggs', 'Cat']
insert(2, 'Things'); // ['milk, 'dozen eggs', 'Things']
```

With a specified name:

```tsx
const [shopList, setShopList] = useState(['milk', 'eggs', 'pipes']);
const { addShopItem, removeShopItem, setShopItem, insertShopItem } =
    useArrayState(shopList, setShopList, 'shopItem');

addShopItem('Cat');
removeShopItem(2);
setShopItem(1, 'dozen eggs');
insertShopItem(2, 'Things');
```

## `ArrayMap`

A component to map each item of an array to content, which recieves several methods relative to the current item.

### Example Usage

```tsx
const [shopList, setShopList] = useState(['milk', 'eggs', 'pipes']);

<ArrayMap array={shopList} setArray={setShopList}>
    {(value, { set, remove }) => (
        <div>
            {value}
            <button onClick={() => set('cat')}>Change to cat</button>
            <button onClick={remove}>X</button>
        </div>
    )}
</ArrayMap>;
```

```tsx
const [shopList, setShopList] = useState(['milk', 'eggs', 'pipes']);

<ArrayMap array={shopList} setArray={setShopList}>
    {(value, actions) => <>
        <div>
            <input value={value} onChange={event => actions.set(event.target.value)} />
            <button onClick={actions.remove}>X</button>
        </div>
        <button onClick={() => actions.insertAfter('')}>+</button>
    </>}
</ArrayMap>
```
