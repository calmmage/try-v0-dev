"use client"

import { useState } from "react"
import { addTodo } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"

export function AddTodoForm() {
  const [text, setText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    await addTodo(formData)
    setText("")
    setIsSubmitting(false)
  }

  return (
    <form action={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="text"
        name="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isSubmitting || !text.trim()}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  )
}

