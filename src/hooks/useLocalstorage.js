import { useState, useRef, useEffect } from "react";

function useLocalstorage(
  key,
  initialValue,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return deserialize(item);
      }

      return initialValue instanceof Function ? initialValue() : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const prevKeyRef = useRef(key);
  // Use useEffect to update localstorage when value changes
  useEffect(() => {
    try {
      if (prevKeyRef.current !== key) {
        window.localStorage.removeItem(prevKeyRef.current);
      }

      prevKeyRef.current = key;
      window.localStorage.setItem(key, serialize(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [storedValue, serialize, key]);

  return [storedValue, setStoredValue];
}

export default useLocalstorage;
