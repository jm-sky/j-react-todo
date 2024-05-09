import { Dispatch, SetStateAction } from 'react';
import TodoItem, { ITodoItem } from './TodoItem';

export interface ITodoListProps {
  items: ITodoItem[]
  setItems: Dispatch<SetStateAction<ITodoItem[]>>
}

export default function TodoList({ items, setItems }: ITodoListProps) {

  const sorted = items.toSorted((itemA, itemB): number => {
    return (itemA.isDone ? 1 : 0) - (itemB.isDone ? 1 : 0);
  });

  return (
    <ol className="todo-list flex flex-col items-center gap-3">
      {items?.length > 0 ? (
        sorted.map((item, index) =>
          <TodoItem key={index} item={item} setItems={setItems} />
        )
      ) : (
        <p>You have nothing to do...</p>
      )}
    </ol>
  );
}
