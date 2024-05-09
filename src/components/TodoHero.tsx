import './todoHero.css';

export interface TodoHeroProps {
  completedTodos: number
  totalTodos: number
}

export default function TodoHero({ completedTodos, totalTodos}: TodoHeroProps) {
  const progress = Math.round(completedTodos / totalTodos * 100);

  return (
    <section className="todo-hero sticky top-1 flex flex-col rounded-lg border border-primary/50 bg-primary-950/30 backdrop-blur-lg shadow-lg px-2 py-5">
      <div className="flex justify-around items-center">
        <div>
          <p className="text-xl font-semibold drop-shadow">Tasks done</p>
          <p>Keep it up</p>
        </div>
        <div className="size-20 text-2xl font-semibold flex items-center justify-center bg-gradient-to-b from-primary to-primary-800 shadow shadow-primary/50 rounded-full text-white">
          {completedTodos}/{totalTodos}
        </div>
      </div>
      <div className="w-full mt-2 -mb-2 px-2">
        <progress className="h-2 w-full text-primary shadow" value={progress} max="100" />
      </div>
    </section>
  );
}
