"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "./supabase"

export async function getTodos() {
  try {
    const { data, error } = await supabase.from("todos").select("*").order("id")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Failed to fetch todos:", error)
    return []
  }
}

export async function addTodo(formData: FormData) {
  const text = formData.get("text") as string

  if (!text || text.trim() === "") {
    return { error: "Todo text cannot be empty" }
  }

  try {
    const { error } = await supabase.from("todos").insert([{ text: text.trim(), completed: false }])

    if (error) throw error

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to add todo:", error)
    return { error: "Failed to add todo" }
  }
}

export async function toggleTodo(id: number, completed: boolean) {
  try {
    const { error } = await supabase.from("todos").update({ completed }).eq("id", id)

    if (error) throw error

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to toggle todo:", error)
    return { error: "Failed to update todo" }
  }
}

export async function deleteTodo(id: number) {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete todo:", error)
    return { error: "Failed to delete todo" }
  }
}

export async function updateTodoText(id: number, text: string) {
  if (!text || text.trim() === "") {
    return { error: "Todo text cannot be empty" }
  }

  try {
    const { error } = await supabase.from("todos").update({ text: text.trim() }).eq("id", id)

    if (error) throw error

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to update todo:", error)
    return { error: "Failed to update todo" }
  }
}

