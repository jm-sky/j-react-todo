import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import TodoMenuButton from './TodoMenuButton';

export interface ITodoItem {
  id: string
  title: string
  isCompleted?: boolean
}

export interface ITodoItemProps {
  item: ITodoItem
  setItems: Dispatch<SetStateAction<ITodoItem[]>>
}

export default function TodoItem({ item, setItems }: ITodoItemProps) {
  const [title, setTitle] = useState(item.title);
  const [isEditing, setEditing] = useState(false);

  const toggleItem = () => {
    item.isCompleted = !item.isCompleted;

    setItems((prevItems) => prevItems.map((prev: ITodoItem) => prev.id === item.id ? item : prev));
  };

  const deleteItem = () => {
    setItems((prevItems) => prevItems.filter((prev: ITodoItem) => prev.id !== item.id));
  };

  const toggleEdition = () => {
    setEditing(edit => !edit);
  };

  useEffect(() => setTitle(item.title), [isEditing, item]);

  const saveEdition = () => {
    item.title = title;

    setItems((prevItems) => prevItems.map((prev: ITodoItem) => prev.id === item.id ? item : prev));
    setEditing(false);
  };

  function CheckMark() {
    return (
      <button onClick={toggleItem}>
        <div className="flex items-center justify-center rounded-full bg-black/50 size-6" >
          {item.isCompleted && (<FaCheck />)}
        </div>
      </button>
    );
  }

  function Menu() {
    return (
      <div className="flex flex-row items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <TodoMenuButton onClick={toggleEdition} tooltip="Edit">
          <span className="sr-only">Edit</span>
          <FaEdit />
        </TodoMenuButton>
        <TodoMenuButton onClick={deleteItem} tooltip="Delete">
          <span className="sr-only">Delete</span>
          <FaTrash />
        </TodoMenuButton>
      </div>
    );
  }

  function EditionMenu() {
    return (
      <div className="flex flex-row items-center justify-end gap-2">
        <TodoMenuButton onClick={saveEdition} tooltip="Save">
          <span className="sr-only">Save</span>
          <FaCheck />
        </TodoMenuButton>
        <TodoMenuButton onClick={toggleEdition} tooltip="Cancel">
          <span className="sr-only">Cancel</span>
          <FaTimes />
        </TodoMenuButton>
      </div>
    );
  }

  function Content() {
    return (
      <p className={`${isEditing ? 'w-0' : 'w-full'} ${item.isCompleted ? 'line-through' : ''} text-nowrap overflow-hidden transition-all`}>
        {item.title}
      </p>
    );
  }

  function Edition() {
    return (
      <div className="w-full">
        <input name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-0 min-w-full text-sm py-1 px-3 bg-primary-950/50 rounded-md text-white font-normal" />
      </div>
    );
  }

  const classes = [
    'group w-full flex flex-row items-center justify-between gap-2 h-12 p-3 rounded-lg shadow-lg border border-primary/50 text-white bg-primary-900/75 hover:bg-primary-900/85',
    'transition-all',
    item.isCompleted ? 'opacity-50' : '',
    isEditing ? 'scale-105' : '',
  ].join(' ');

  return (
    <li id={item.id} className={`${classes} relative`}>
      <div className="w-full flex flex-row items-center gap-3 overflow-hidden">
        { !isEditing && <CheckMark /> }
        { !isEditing && <Content /> }
        { isEditing && <Edition /> }
      </div>
      { isEditing ? <EditionMenu /> : <Menu /> }
    </li>
  );
}
