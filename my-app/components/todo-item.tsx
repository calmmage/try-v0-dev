"use client"

import { useState } from "react"
import type { Todo } from "@/lib/supabase"
import { toggleTodo, deleteTodo, updateTodoText } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Trash, Edit, Save, X } from "lucide-react"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  async function handleToggle() {
    setIsToggling(true)
    await toggleTodo(todo.id, !todo.completed)
    setIsToggling(false)
  }

  async function handleDelete() {
    setIsDeleting(true)
    await deleteTodo(todo.id)
    setIsDeleting(false)
  }

  async function handleSave() {
    if (editText.trim() !== todo.text) {
      setIsSaving(true)
      await updateTodoText(todo.id, editText)
      setIsSaving(false)
    }
    setIsEditing(false)
  }

  function handleCancel() {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-card">
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          disabled={isToggling}
          id={`todo-${todo.id}`}
        />

        {isEditing ? (
          <Input value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1" autoFocus />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
          >
            {todo.text}
          </label>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={handleSave}
              disabled={isSaving || !editText.trim() || editText.trim() === todo.text}
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="icon" onClick={() => setIsEditing(true)} disabled={todo.completed}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDelete} disabled={isDeleting}>
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

