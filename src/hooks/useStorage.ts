import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface IUseStorageOptions {
  storage?: Storage
}

const defaultOptions: IUseStorageOptions = {
  storage: window?.localStorage,
};

export function useStorage<T extends any>(key: string, defaults: T, options: IUseStorageOptions = defaultOptions): [T, Dispatch<SetStateAction<T>>] {
  const { storage } = options
  
  const parseJson = (json: string): null | T => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  const loadValue = (): T => {
    const raw = storage?.getItem(key);

    if (!raw) return defaults;

    return parseJson(raw) ?? defaults;
  }

  const saveValue = (value: T): void => {
    storage?.setItem(key, JSON.stringify(value));
  };

  const [value, setter] = useState<T>(loadValue());

  useEffect(() => saveValue(value), [value])

  return [
    value,
    setter,
  ];
}
