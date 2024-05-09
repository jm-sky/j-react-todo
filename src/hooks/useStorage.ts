import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface IUseStorageOptions<T extends any> {
  storage?: Storage
  deserializer?: (value: any) => T
}

export function useStorage<T extends any>(key: string, defaults: T, options?: IUseStorageOptions<T>): [T, Dispatch<SetStateAction<T>>] {
  const storage: Storage | null = options?.storage ? options?.storage : typeof window !== 'undefined' ? window?.localStorage : null;
  const deserializer = options?.deserializer;
  
  const parseJson = (json: string): null | T => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const loadValue = (): T => {
    const raw = storage?.getItem(key);

    if (!raw) return defaults;

    const data = parseJson(raw);

    if (!data) return defaults;

    return deserializer ? deserializer(data) : data;
  };

  const [value, setter] = useState<T>(loadValue());

  useEffect(() => {
    const saveValue = (value: T): void => {
      storage?.setItem(key, JSON.stringify(value));
    };

    saveValue(value);
  }, [key, value, storage]);

  return [
    value,
    setter,
  ];
}
