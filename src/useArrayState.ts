import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

interface ArrayOperations<T> {
    add: (value: T) => void,
    set: (index: number, value: T) => void,
    remove: (index: number) => void,
    insert: (index: number, value: T) => void
}

function useArrayState<T>(array: T[], setArray: Dispatch<SetStateAction<T[]>>): ArrayOperations<T>
function useArrayState<T, N extends string>(array: T[], setArray: Dispatch<SetStateAction<T[]>>, name: N): {
    [key in keyof ArrayOperations<T> as `${key}${Capitalize<N>}`]: ArrayOperations<T>[key]
};
function useArrayState<T>(array: T[], setArray: Dispatch<SetStateAction<T[]>>, name?: string) {
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

    return name ? {
        ['add' + name]: add,
        ['remove' + name]: remove,
        ['set' + name]: set,
        ['insert' + name]: insert
    } : { add, remove, set, insert };
}

export { useArrayState };
