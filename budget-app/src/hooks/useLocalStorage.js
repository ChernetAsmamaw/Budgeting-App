// Use useState and useEffect to store the state in the local storage
import { useState, useEffect } from 'react';


export function useLocalStorage (key, defaultValue) {
    // Use a callback function to set the default value
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue !== null) return JSON.parse(jsonValue);
        if (typeof defaultValue === 'function') {
            return defaultValue();
        } else {
            return defaultValue;
        }
    })
    
    // To update the state and the local storage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
};
