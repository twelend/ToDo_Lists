import React from "react"

export interface Todo {
    id: string
    text: string
    completed: boolean
}

export interface ItemProps {
    id: string
    text: string
    completed: boolean
    changeTodo: (id: string, text: string) => void
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

export interface InputUIProps {
    newTodo: string,
    setNewTodo: React.Dispatch<React.SetStateAction<string>>
}