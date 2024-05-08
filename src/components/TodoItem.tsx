import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useState } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

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
  const [title, setTitle] = useState(item.title)
  const [editing, setEditing] = useState(false)

  const toggleItem = () => {
    item.isCompleted = !item.isCompleted;

    setItems((prevItems) => prevItems.map((prev: ITodoItem) => prev.id === item.id ? item : prev));
  }

  const deleteItem = () => {
    setItems((prevItems) => prevItems.filter((prev: ITodoItem) => prev.id !== item.id));
  }

  const toggleEdition = () => {
    setEditing(edit => !edit);
  }

  const saveEdition = () => {
    item.title = title;

    setItems((prevItems) => prevItems.map((prev: ITodoItem) => prev.id === item.id ? item : prev));
    setEditing(false);
  }

  function CheckMark() {
    return (
      <div className="flex items-center justify-center rounded-full bg-black/50 size-6" >
        {item.isCompleted && (<FaCheck />)}
      </div>
    )
  }

  return (
    <li
      id={item.id}
      className={`group w-full flex flex-row items-center justify-between gap-2 h-12 p-3 rounded-lg border border-primary/50 text-white bg-primary-900/75 hover:bg-primary-900/85 ${item.isCompleted ? "opacity-50" : ""}`}
    >
      {
        editing ? (
          <>
            <div className="text-sm w-full">
              <input value={title} onChange={e => setTitle(e.target.value)} className="w-0 min-w-full py-1 px-2 bg-primary-950/50 rounded-md text-white font-normal" />
            </div>
            <div className="flex items-center justify-end gap-1">
              <button onClick={saveEdition} className="p-0.5 flex items-center text-primary/75 hover:text-primary" data-tooltip="Save">
                <span className="sr-only">Save</span>
                <FaCheck />
              </button>
              <button type="button" onClick={toggleEdition} className="p-0.5 flex items-center text-primary/75 hover:text-primary" data-tooltip="Cancel">
                <span className="sr-only">Cancel</span>
                <FaTimes />
              </button>
            </div>
          </>
        ) : (
          <>
            <button onClick={toggleItem} className="flex flex-row items-center text-sm gap-2 w-full">
              <CheckMark />
              <p className={item.isCompleted ? 'line-through' : ''}>{item.title}</p>
            </button>
            <div className="opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-end gap-1">
              <button type="button" onClick={toggleEdition} className="p-0.5 flex items-center text-primary/75 hover:text-primary" data-tooltip="Edit">
                <span className="sr-only">Edit</span>
                <FaEdit />
              </button>
              <button type="button" onClick={deleteItem} className="p-0.5 flex items-center text-primary/75 hover:text-primary"  data-tooltip="Delete">
                <span className="sr-only">Delete</span>
                <FaTrash />
              </button>
            </div>
          </>
        )
      }
    </li>
  );
}
