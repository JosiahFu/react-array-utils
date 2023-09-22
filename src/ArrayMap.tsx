import React, { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import { ArrayOperations, useArrayState } from './useArrayState';

interface ChildActions<T> {
    set: (value: T) => void;
    remove: () => void;
    insertBefore: (value: T) => void;
    insertAfter: (value: T) => void;
    replace: (...values: T[]) => void;
}

function MapChild<T>({
    value,
    index,
    actions,
    children,
}: {
    value: T;
    index: number;
    actions: ArrayOperations<T>;
    children: (
        value: T,
        actions: ChildActions<T>,
        index: number,
        arrayActions: ArrayOperations<T>
    ) => ReactNode;
}) {
    const { set, remove, insert, splice } = actions;

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

    const handleReplace = useCallback(
        (...values: T[]) => {
            splice(index, 0, values);
        },
        [index, splice]
    );

    return children(
        value,
        {
            set: handleSet,
            remove: handleRemove,
            insertBefore: handleInsertBefore,
            insertAfter: handleInsertAfter,
            replace: handleReplace,
        },
        index,
        actions
    );
}

type PropsOfType<O extends object, T> = {
    [K in keyof O]: O[K] extends T ? K : never;
}[keyof O];

/**
 * Component that maps over an array and renders children components with array manipulation actions.
 *
 * @param props - The component props.
 * @param props.array - The array to be mapped over.
 * @param props.setArray - The state setter function for the array.
 * @param props.keys - The keys for the array items
 * @param props.keyProp - The name of the object prop that should be used for array keys
 * @param props.children - Render function that receives the value and array manipulation actions as arguments.
 * @returns A React element.
 */
function ArrayMap<
    T,
    K extends T extends object ? PropsOfType<T, string | number> : never
>({
    array,
    setArray,
    children,
    ...otherProps
}: {
    array: T[];
    setArray: Dispatch<SetStateAction<T[]>>;
    children: (
        value: T,
        actions: ChildActions<T>,
        index: number,
        arrayActions: ArrayOperations<T>
    ) => ReactNode;
} & (
    | {}
    | {
          keys: (string | number)[];
      }
    | {
          keyProp: K;
      }
)) {
    const actions = useArrayState(array, setArray);
    const keys = 'keys' in otherProps ? otherProps.keys : undefined;
    const keyProp = 'keyProp' in otherProps ? otherProps.keyProp : undefined;
    const arrayKeys = keys ??
        (keyProp
            ? (array.map(e => e[keyProp]) as (string | number)[])
            : undefined) ?? [...array.keys()];

    return (
        <>
            {array.map((e, i) => (
                <MapChild
                    key={arrayKeys[i]}
                    value={e}
                    index={i}
                    actions={actions}>
                    {children}
                </MapChild>
            ))}
        </>
    );
}

export { ArrayMap };
