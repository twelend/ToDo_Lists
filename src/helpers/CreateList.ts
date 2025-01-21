import { toast } from "sonner"

interface CreateListProps {
    name: string
}

export const createList = ({ name }: CreateListProps) => {
    if (name.trim().length < 1) return toast.error('Введите название списка!')
    localStorage.setItem('lists', JSON.stringify([...JSON.parse(localStorage.getItem('lists') || '[]'), {
        listId: Date.now().toString(),
        name: name.trim(),
        tasks: []
    }]))
    toast.success('Список успешно создан!')
}