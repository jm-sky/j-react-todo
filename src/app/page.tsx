'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import { useStorage } from '@/hooks/useStorage';
import { ITaskJson, Task } from '@/models/task.model';
import Loader from '@/components/Loader';

const TodoHero = dynamic(() => import('@/components/TodoHero'), { ssr: false, loading: () => <Loader /> });
const TodoList = dynamic(() => import('@/components/TodoList'), { ssr: false, loading: () => <Loader /> });

export default function Home() {
  const deserializer = (items: ITaskJson[]) => items.map(task => Task.fromJson(task));
  const [items, setItems] = useStorage<Task[]>('tasks', [], { deserializer });

  const totalTodos = items.length;
  const completedTodos = items.filter(item => item.isDone).length;

  return (
    <main className="grid justify-center items-start min-h-screen p-4">
      <div className="flex flex-col gap-3 pt-4">
        <Header />
        <TodoHero completedTodos={completedTodos} totalTodos={totalTodos} />
        <Form setItems={setItems} />
        <TodoList items={items} setItems={setItems} />
        <Footer />
      </div>
    </main>
  );
}
