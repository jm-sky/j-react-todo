'use client'

import { Dispatch, FormEvent, SetStateAction } from 'react'
import { FaPlus } from 'react-icons/fa'
import { ITodoItem } from './TodoItem'

export interface IFormProps {
  setItems: Dispatch<SetStateAction<ITodoItem[]>>
}

export default function Form({ setItems }: IFormProps) {
  const createItem = (title: string): ITodoItem => ({
    id: self.crypto.randomUUID(),
    title,
    isCompleted: false,
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const title = form.todo.value;
    
    setItems((prevItems) => [...prevItems, createItem(title) ]);

    form.reset();
  }

  return (
    <form className="flex flex-row items-center gap-4 rounded-lg py-2 px-1" onSubmit={submit}>
      <label htmlFor="todo" className="w-full">
        <input
          type="text"
          name="todo"
          id="todo"
          className="p-3 w-full rounded-md bg-primary-950/30 text-white text-sm hover:bg-primary-950/50"
          placeholder="Write Your next task"
        />
      </label>
      <button type="submit" className="flex items-center p-3 rounded-md font-semibold transition-colors bg-primary/50 text-white hover:bg-primary/75">
        <span className="sr-only">Submit</span>
        <FaPlus />
      </button>
    </form>
  );
}
