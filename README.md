# `react-array-utils`

Utilities to make dealing with state arrays easier.

## `useArrayState`

Creates functions to add, remove, set, and insert to the array.

### Example Usage

```tsx
const [state, setState] = useState(['milk', 'eggs', 'pipes']);
const {add, remove, set, insert} = useArrayState(state, setState);

add('Cat'); // ['milk', 'eggs', 'pipes', 'Cat']
remove(2); // ['milk', 'eggs', 'Cat']
set(1, 'dozen eggs'); // ['milk', 'dozen eggs', 'Cat']
insert(2, 'Things'); // ['milk, 'dozen eggs', 'Things']
```

With a specified name:

```tsx
const [shopList, setShopList] = useState(['milk', 'eggs', 'pipes']);
const {addShopItem, removeShopItem, setShopItem, insertShopItem} = useArrayState(shopList, setShopList, 'shopItem');

addShopItem('Cat'); // ['milk', 'eggs', 'pipes', 'Cat']
removeShopItem(2); // ['milk', 'eggs', 'Cat']
setShopItem(1, 'dozen eggs'); // ['milk', 'dozen eggs', 'Cat']
insertShopItem(2, 'Things'); // ['milk, 'dozen eggs', 'Things']
```

## `ArrayMap`

A component to map each item of an array to content, which recieves several methods relative to the current item.

### Example Usage

```tsx
const [shopList, setShopList] = useState(['milk', 'eggs', 'pipes']);

<ArrayMap array={shopList} setArray={setShopList}>
    {(value, {set, remove, insertBefore, insertAfter}) => <div>
        {value}
        <button onClick={() => set('cat')}>Change to cat</button>
        <button onClick={remove}>X</button>
    </div>}
</ArrayMap>
```
