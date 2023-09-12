import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from 'react';

interface ArrayOperations<T> {
    add: (value: T) => void,
    set: (index: number, value: T) => void,
    remove: (index: number) => void,
    insert: (index: number, value: T) => void
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

    useEffect(() => {
        arrayRef.current = array;
    }, [array]);

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

    const returnedItems = useMemo(() => (
        { add, remove, set, insert }
    ), [add, insert, remove, set]);

    return returnedItems;
}

export { useArrayState, ArrayOperations };
