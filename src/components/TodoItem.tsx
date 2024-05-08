import { Dispatch, SetStateAction } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

export interface ITodoItem {
  id?: string
  title?: string
  isCompleted?: boolean
}

export interface ITodoItemProps {
  item: ITodoItem
  setItems: Dispatch<SetStateAction<ITodoItem[]>>
}

export default function TodoItem({ item, setItems }: ITodoItemProps) {
  const toggleItem = () => {
    item.isCompleted = !item.isCompleted;

    setItems((prevItems) => prevItems.map((prev: ITodoItem) => prev.id === item.id ? item : prev))
  }

  const deleteItem = () => {
    setItems((prevItems) => prevItems.filter((prev: ITodoItem) => prev.id !== item.id))
  }

  return (
    <li id={item.id} className="w-full flex items-center justify-between border border-primary/50 text-white bg-primary-900/75 p-3 rounded-lg">
      <button onClick={toggleItem} className="todo-item-left flex items-center text-sm gap-2">
        <div className="flex items-center justify-center rounded-full bg-black/75 size-6" >
          {item.isCompleted && (<FaCheck />)}
        </div>
        <p className={item.isCompleted ? 'line-through' : ''}>{item.title}</p>
      </button>
      <div className="todo-item-right flex items-center justify-end gap-1">
        <button onClick={deleteItem} className="p-1 flex items-center text-primary/75 hover:text-primary">
          <span className="sr-only">Delete</span>
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
