import { getTodos } from "@/lib/actions"
import { AddTodoForm } from "@/components/add-todo-form"
import { TodoList } from "@/components/todo-list"

export default async function Home() {
  // Check if Supabase URL and key are set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <main className="container max-w-2xl mx-auto p-4 py-8">
        <div className="p-4 border rounded-lg bg-red-50 text-red-500">
          <h1 className="text-xl font-bold">Configuration Error</h1>
          <p>
            Supabase environment variables are not properly set. Please check your .env.local file or environment
            variables in your deployment platform.
          </p>
        </div>
      </main>
    )
  }

  const todos = await getTodos()

  return (
    <main className="container max-w-2xl mx-auto p-4 py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Todo App</h1>
          <p className="text-muted-foreground">Manage your tasks with this simple todo application.</p>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <AddTodoForm />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Your Todos</h2>
          <TodoList todos={todos} />
        </div>
      </div>
    </main>
  )
}

