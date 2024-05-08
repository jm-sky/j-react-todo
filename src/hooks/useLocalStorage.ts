import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useLocalStorate<T extends any>(key: string, defaults: T): [T, Dispatch<SetStateAction<T>>] {
  const loadValue = (): T => {
    const raw = localStorage.getItem(key);

    if (!raw) return defaults;

    return JSON.parse(raw) ?? defaults;
  }

  const saveValue = (value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const [value, setter] = useState<T>(loadValue());

  useEffect(() => saveValue(value), [value])

  return [
    value,
    setter,
  ];
}
