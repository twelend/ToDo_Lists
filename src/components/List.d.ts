import type React from "react";
import { Todo } from "../types/todo.types";
interface ListProps {
    listType: string;
    name?: string;
    setLists: React.Dispatch<React.SetStateAction<{
        listId: string;
        name: string;
        tasks: Todo[];
    }[]>>;
    lists: {
        listId: string;
        name: string;
        tasks: Todo[];
    }[];
}
export declare const List: React.FC<ListProps>;
export {};
