import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaCalendar, FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Task } from '@/models/task.model';
import TodoMenuButton from './TodoMenuButton';

export interface ITodoItemProps {
  item: Task
  setItems: Dispatch<SetStateAction<Task[]>>
}

export default function TodoItem({ item, setItems }: ITodoItemProps) {
  const [title, setTitle] = useState(item.title);
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const toggleItem = () => {
    item.isDone = !item.isDone;
    item.doneDate = item.isDone ? new Date() : null;

    setItems((prevItems) => prevItems.map((prev: Task) => prev.id === item.id ? item : prev));
  };

  const deleteItem = () => {
    setItems((prevItems) => prevItems.filter((prev: Task) => prev.id !== item.id));
  };

  const toggleEdition = () => {
    setEditing(edit => !edit);
  };

  useEffect(() => setTitle(item.title), [isEditing, item]);

  const saveEdition = () => {
    item.title = title;

    setItems((prevItems) => prevItems.map((prev: Task) => prev.id === item.id ? item : prev));
    setEditing(false);
  };

  function CheckMark() {
    return (
      <button onClick={toggleItem}>
        <div className="flex items-center justify-center rounded-full bg-black/50 size-6" >
          {item.isDone && (<FaCheck />)}
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
      <p onClick={() => setOpen(open => !open)} className={`${isEditing ? 'w-0' : 'w-full'} ${item.isDone ? 'line-through' : ''} cursor-pointer transition-all`}>
        {item.title}
      </p>
    );
  }

  function Edition() {
    return (
      <div className="w-full">
        <input
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          // onKeyDown={e => e.key === 'Enter' && setTitle(e.target.value) }
          className="w-0 min-w-full text-sm py-1 px-3 bg-primary-950/50 rounded-md text-white font-normal outline-primary/50"
        />
      </div>
    );
  }

  function Footer() {
    return (
      <div className="w-full flex flex-col gap-1 px-2 py-1 font-light text-xs bg-primary-950/75 rounded-lg">
        <div className="flex flex-row items-center gap-2">
          <FaPlus /> {item.createdAt.toLocaleDateString()} @ {item.createdAt.toLocaleTimeString()}
        </div>
        { item.dueDate && 
          <div className="flex flex-row items-center gap-2">
            <FaCalendar /> {item.dueDate.toLocaleDateString()} @ {item.dueDate.toLocaleTimeString()}
          </div>
        }
        {
          item.doneDate &&
          <div className="flex flex-row items-center gap-2">
            <FaCheck /> {item.doneDate.toLocaleDateString()} @ {item.doneDate.toLocaleTimeString()}
          </div>
        }
      </div>
    );
  }

  const classes = [
    'group w-full flex flex-col gap-1 p-1 rounded-lg shadow-lg border border-primary/50 text-white bg-primary-900/75 hover:bg-primary-900/85',
    'transition-all',
    item.isDone ? 'opacity-50' : '',
    isEditing ? 'scale-105' : '',
  ].join(' ');

  return (
    <li id={item.id} className={classes}>
      <div className="flex flex-row items-center justify-between gap-2 p-2">
        <div className="w-full flex flex-row items-center gap-3">
          { !isEditing && <CheckMark /> }
          { !isEditing && <Content /> }
          { isEditing && <Edition /> }
        </div>
        { isEditing ? <EditionMenu /> : <Menu /> }
      </div>
      { isOpen && <Footer /> }
    </li>
  );
}
