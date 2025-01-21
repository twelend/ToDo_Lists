import React from 'react'
import { InputUIProps } from '../types/todo.types'

export const Input: React.FC<InputUIProps> = ({ newTodo, setNewTodo }) => {
    return (
        <div className=''>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Добавить задачу..."
                className="text-black w-full p-2 border border-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}