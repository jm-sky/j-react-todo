export interface TodoHeroProps {
  completedTodos: number
  totalTodos: number
}

export default function TodoHero({ completedTodos, totalTodos}: TodoHeroProps) {
  return (
    <section className="rounded-lg border border-primary/75 flex justify-around items-center px-2 py-5">
      <div>
        <p className="text-xl font-semibold">Tasks done</p>
        <p>Keep it up</p>
      </div>
      <div className="size-20 text-2xl font-semibold flex items-center justify-center bg-primary rounded-full text-white">
        {completedTodos}/{totalTodos}
      </div>
    </section>
  )
}
