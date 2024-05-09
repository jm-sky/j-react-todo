'use client';

import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import TodoHero from '@/components/TodoHero';
import { ITodoItem } from '@/components/TodoItem';
import TodoList from '@/components/TodoList';
import { useStorage } from '@/hooks/useStorage';

export default function Home() {
  const [items, setItems] = useStorage<ITodoItem[]>('todos', []);

  const totalTodos = items.length;
  const completedTodos = items.filter(item => item.isCompleted).length;

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
