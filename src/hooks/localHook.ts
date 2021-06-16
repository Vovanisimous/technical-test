import React, {useState} from 'react'

type IUseStickyState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useStickyState = <T>(defaultValue: T, key: string): IUseStickyState<T>=> {
    const [value, setValue] = useState<T>(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue]
}