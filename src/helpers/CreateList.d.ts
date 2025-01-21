import { Todo } from "../types/todo.types";
interface CreateListProps {
    name: string;
    onCreate: (newList: {
        listId: string;
        name: string;
        tasks: Todo[];
    }) => void;
}
export declare const createList: ({ name, onCreate }: CreateListProps) => string | number | undefined;
export {};
