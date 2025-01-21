import { toast } from "sonner";
import { Todo } from "../types/todo.types";

interface CreateListProps {
    name: string;
    onCreate: (newList: { listId: string, name: string, tasks: Todo[] }) => void;
}

export const createList = ({ name, onCreate }: CreateListProps) => {
    if (name.trim().length < 1) return toast.error('Введите название списка!');

    const existingLists = JSON.parse(localStorage.getItem('lists') || '[]');
    const newList = {
        listId: Date.now().toString(),
        name: name.trim(),
        tasks: []
    };
    const updatedLists = [...existingLists, newList];

    localStorage.setItem('lists', JSON.stringify(updatedLists));
    onCreate(newList);
    toast.success('Список успешно создан!');
};
