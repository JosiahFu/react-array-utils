import React, { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import { useArrayState } from './useArrayState';

/**
 * Component that maps over an array and renders children components with array manipulation actions.
 *
 * @param props - The component props.
 * @returns A React element.
 */
function MapChild<T>({
    value,
    index,
    set,
    remove,
    insert,
    children,
}: {
    value: T;
    index: number;
    set: (index: number, value: T) => void;
    remove: (index: number) => void;
    insert: (index: number, value: T) => void;
    children: (
        value: T,
        actions: {
            set: (value: T) => void;
            remove: () => void;
            insertBefore: (value: T) => void;
            insertAfter: (value: T) => void;
        }
    ) => ReactNode;
}) {
    const handleSet = useCallback(
        (value: T) => {
            set(index, value);
        },
        [index, set]
    );

    const handleRemove = useCallback(() => {
        remove(index);
    }, [index, remove]);

    const handleInsertBefore = useCallback(
        (value: T) => {
            insert(index, value);
        },
        [index, insert]
    );

    const handleInsertAfter = useCallback(
        (value: T) => {
            insert(index + 1, value);
        },
        [index, insert]
    );

    return children(value, {
        set: handleSet,
        remove: handleRemove,
        insertBefore: handleInsertBefore,
        insertAfter: handleInsertAfter,
    });
}

/**
 * Component that maps over an array and renders children components with array manipulation actions.
 *
 * @param props - The component props.
 * @param props.array - The array to be mapped over.
 * @param props.setArray - The state setter function for the array.
 * @param props.children - Render function that receives the value and array manipulation actions as arguments.
 * @returns A React element.
 */
function ArrayMap<T>({
    array,
    setArray,
    children,
}: {
    array: T[];
    setArray: Dispatch<SetStateAction<T[]>>;
    children: (
        value: T,
        actions: {
            set: (value: T) => void;
            remove: () => void;
            insertBefore: (value: T) => void;
            insertAfter: (value: T) => void;
        }
    ) => ReactNode;
}) {
    const { set, remove, insert } = useArrayState(array, setArray);

    return (
        <>
            {array.map((e, i) => (
                <MapChild
                    value={e}
                    index={i}
                    set={set}
                    remove={remove}
                    insert={insert}>
                    {children}
                </MapChild>
            ))}
        </>
    );
}

export { ArrayMap };
