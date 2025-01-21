import React from "react"
import { Check, Pen, Trash2, X } from "lucide-react"
import { ItemProps } from "../types/todo.types"
import { Input } from "../ui/Input"


export const Item: React.FC<ItemProps> = ({ id, text, completed, changeTodo, onToggle, onDelete }) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [newText, setNewText] = React.useState(text)

    return (
        <li className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center">
                <button
                    onClick={() => onToggle(id)}
                    className={`w-6 h-6 mr-4 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${completed ? "bg-blue border-blue" : "border-gray-300"
                        }`}
                >
                    {completed && <Check size={16} className="text-white" />}
                </button>
                {
                    isEditing ? (
                        <Input newTodo={newText} setNewTodo={setNewText} />
                    ) : (
                        <span className={`text-lg text-text ${completed ? "line-through text-gray-500" : "text-gray-800"}`}>{text}</span>
                    )
                }
            </div>
            <div className="flex items-center gap-3 text-text">
                {isEditing ? (
                    <>
                        <button onClick={() => {
                            setIsEditing(false); changeTodo(id, newText)
                        }}>
                            <Check size={20} />
                        </button>
                        <button onClick={() => setIsEditing(false)}>
                            <X size={20} />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 transition-colors duration-300 mr-4" disabled={isEditing}>
                            <Pen size={20} />
                        </button>
                        <button onClick={() => onDelete(id)} className="text-red-500 hover:text-red-700 transition-colors duration-300">
                            <Trash2 size={20} />
                        </button>
                    </>
                )}
            </div>
        </li>
    )
}

