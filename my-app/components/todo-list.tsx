import type { Todo } from "@/lib/supabase"
import { TodoItem } from "./todo-item"

interface TodoListProps {
  todos: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <div className="text-center p-6 text-muted-foreground">No todos yet. Add one above!</div>
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

