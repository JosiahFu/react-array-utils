import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

function useArrayState<T>(array: T[], setArray: Dispatch<SetStateAction<T[]>>) {
    const arrayRef = useRef(array);
    
    useEffect(() => {
        arrayRef.current = array;
    }, [array]);

    const add = useCallback((item: T) => {
        setArray([...arrayRef.current, item]);
    }, [setArray]);
    
    const remove = useCallback((index: number) => {
        setArray(arrayRef.current.filter((_, i) => i !== index));
    }, [setArray]);
    
    const insert = useCallback((index: number, item: T) => {
        setArray([...arrayRef.current.slice(0, index), item, ...arrayRef.current.slice(index)]);
    }, [setArray]);
    
    const clear = useCallback(() => {
        setArray([]);
    }, [setArray]);

    return { add, remove, insert, clear };
}

export { useArrayState };
