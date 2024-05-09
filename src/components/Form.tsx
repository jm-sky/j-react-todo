'use client';

import { useForm } from 'react-hook-form';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Task } from '@/models/task.model';

export interface IFormProps {
  setItems: Dispatch<SetStateAction<Task[]>>
}

interface IFormData {
  title: string
}

export default function Form({ setItems }: IFormProps) {
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    const item = Task.create({
      title: data.title,
    });

    setItems((prevItems) => [...prevItems, item ]);

    reset();
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center gap-4 rounded-lg py-2 px-1">
        <label htmlFor="todo" className="w-full">
          <input
            {...register('title', {
              required: true,
              minLength: 2,
            })}
            type="text"
            className="p-3 w-full rounded-md bg-primary-950/30 text-white text-sm hover:bg-primary-950/50"
            placeholder="Write Your next task"
          />
        </label>
        <button type="submit" className="flex items-center p-3 rounded-md font-semibold transition-colors bg-primary/50 text-white hover:bg-primary/75 disabled:opacity-50">
          <span className="sr-only">Submit</span>
          <FaPlus />
        </button>
      </div>
    </form>
  );
}
