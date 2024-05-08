export interface TodoHeroProps {
  completedTodos: number
  totalTodos: number
}

export default function TodoHero({ completedTodos, totalTodos}: TodoHeroProps) {
  return (
    <section className="sticky top-1 rounded-lg border border-primary/50 bg-primary-950/30 backdrop-blur-lg flex justify-around items-center px-2 py-5">
      <div>
        <p className="text-xl font-semibold drop-shadow">Tasks done</p>
        <p>Keep it up</p>
      </div>
      <div className="size-20 text-2xl font-semibold flex items-center justify-center bg-gradient-to-b from-primary to-primary-800 shadow shadow-primary/50 rounded-full text-white">
        {completedTodos}/{totalTodos}
      </div>
    </section>
  )
}
