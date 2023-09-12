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
const shopListActions = useArrayState(shopList, setShopList);

shopListActions.add('Cat');
shopListActions.remove(2);
shopListActions.set(1, 'dozen eggs');
shopListActions.insert(2, 'Things');
```

## `ArrayMap`

A component to map each item of an array to content, which recieves several methods relative to the current item.

### API

`ArrayMap` takes `children` in the form of a callback that is called on every
item of the array in a similar manner to `Array.map()`. It is passed parameters
to operate on the array:

- `value`: The array item
- `actions`: An object containing methods to operate on this array item.
    - `set`: Changes the value of this item
    - `remove`: Deletes this item from the list
    - `insertBefore`: Adds a new item before this item
    - `insertAfter`: Adds a new item after this item
- `index`: The index of the item in the list
- `arrayActions`: The same functions returned from `useArrayState`

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
    {(value, actions, index) => <>
        <div>
            <p>Item {index}</p>
            <input value={value} onChange={event => actions.set(event.target.value)} />
            <button onClick={actions.remove}>X</button>
        </div>
        <button onClick={() => actions.insertAfter('')}>+</button>
    </>}
</ArrayMap>
```
