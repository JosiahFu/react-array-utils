import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from 'react';

interface ArrayOperations<T> {
    add: (value: T) => void,
    set: (index: number, value: T) => void,
    remove: (index: number) => void,
    insert: (index: number, value: T) => void,
    splice: (startIndex: number, deleteCount: number, replaceWith: T[]) => void,
}

/**
 * A hook that provides utility functions for managing an array state.
 *
 * @param array - The initial array state.
 * @param setArray - The state setter function.
 * @returns An object containing array manipulation functions.
 */
function useArrayState<T>(array: T[], setArray: Dispatch<SetStateAction<T[]>>): ArrayOperations<T> {
    const arrayRef = useRef(array);

    arrayRef.current = array;

    const add = useCallback((value: T) => {
        setArray([...arrayRef.current, value]);
    }, [setArray]);

    const remove = useCallback((index: number) => {
        setArray(arrayRef.current.filter((_, i) => i !== index));
    }, [setArray]);

    const set = useCallback((index: number, value: T) => {
        setArray(arrayRef.current.map((e, i) => i === index ? value : e));
    }, [setArray]);

    const insert = useCallback((index: number, value: T) => {
        setArray([...arrayRef.current.slice(0, index), value, ...arrayRef.current.slice(index)]);
    }, [setArray]);

    const splice = useCallback((startIndex: number, deleteCount: number, replaceWith: T[] = []) => {
        setArray([...arrayRef.current.slice(0, startIndex), ...replaceWith, ...arrayRef.current.slice(startIndex + deleteCount)])
    }, [setArray])

    const returnedItems = useMemo(() => (
        { add, remove, set, insert, splice }
    ), [add, insert, remove, set, splice]);

    return returnedItems;
}

export { useArrayState, ArrayOperations };
