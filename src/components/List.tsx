import type React from "react"
import { useEffect, useState } from "react"
import { Item } from "./Item"
import { Todo } from "../types/todo.types"
import { Input } from "../ui/Input"
import { toast } from "sonner"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { createList } from "../helpers/CreateList"

interface ListProps {
    listType: string
    name?: string
    setLists: any
    lists: { listId: string, name: string, tasks: Todo[] }[]
}


export const List: React.FC<ListProps> = ({ listType, setLists, lists }) => {
    const [newTodo, setNewTodo] = useState("")
    const [selectedList, setSelectedList] = useState<{ listId: string, name: string, tasks: Todo[] } | null>(null);
    const [openSelect, setOpenSelect] = useState(false)

    useEffect(() => {
        if (lists.length > 0 && !selectedList) {
            setSelectedList(lists[0]);
        }
    }, [lists, selectedList]);

    useEffect(() => {
        setSelectedList(lists[lists.length - 1]);
    }, [localStorage.getItem('lists')]);

    // Добавление задач
    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() && selectedList) {
            const updatedLists = lists.map(list =>
                list.listId === selectedList.listId
                    ? { ...list, tasks: [...list.tasks, { id: Date.now().toString(), text: newTodo.trim(), completed: false }] }
                    : list
            );
            setLists(updatedLists);
            setSelectedList({ ...selectedList, tasks: [...selectedList.tasks, { id: Date.now().toString(), text: newTodo.trim(), completed: false }] });
            setNewTodo("");
            toast.success('Задача успешно добавлена!');
        }
    };

    const toggleTodo = (id: string) => {
        if (selectedList) {
            const updatedTasks = selectedList.tasks.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            const updatedLists = lists.map(list =>
                list.listId === selectedList.listId ? { ...list, tasks: updatedTasks } : list
            );
            const completedTodo = selectedList.tasks.find(todo => todo.id === id);
            if (completedTodo) {
                toast.success(completedTodo.completed ? 'Отмена выполнения задачи!' : 'Задача выполнена!');
            }
            setLists(updatedLists);
            setSelectedList({ ...selectedList, tasks: updatedTasks });
        }
    };

    const deleteTodo = (id: string) => {
        if (selectedList) {
            const updatedTasks = selectedList.tasks.filter(todo => todo.id !== id);
            const updatedLists = lists.map(list =>
                list.listId === selectedList.listId ? { ...list, tasks: updatedTasks } : list
            );
            setLists(updatedLists);
            setSelectedList({ ...selectedList, tasks: updatedTasks });
            toast.success('Задача удалена!');
        }
    };

    const changeTodo = (id: string, text: string) => {
        if (selectedList) {
            const updatedTasks = selectedList.tasks.map(todo =>
                todo.id === id ? { ...todo, text } : todo
            );
            const updatedLists = lists.map(list =>
                list.listId === selectedList.listId ? { ...list, tasks: updatedTasks } : list
            );
            setLists(updatedLists);
            setSelectedList({ ...selectedList, tasks: updatedTasks });
            toast.success('Задача успешно изменена!');
        }
    };

    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    useEffect(() => {
        if (selectedList) {
            if (listType === 'all') {
                setFilteredTodos(selectedList.tasks);
            } else if (listType === 'completed') {
                setFilteredTodos(selectedList.tasks.filter(todo => todo.completed));
            } else if (listType === 'uncompleted') {
                setFilteredTodos(selectedList.tasks.filter(todo => !todo.completed));
            }
        }
    }, [selectedList, listType]);

    const [listName, setListName] = useState("");
    const handleCreateList = (newList: { listId: string, name: string, tasks: Todo[] }) => {
        setLists((prevLists: { listId: string, name: string, tasks: Todo[] }[]) => [...prevLists, newList]);
        setSelectedList(newList);
    };

    const deleteList = (listId: string) => {
        const updatedLists = lists.filter(list => list.listId !== listId);
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        setSelectedList(updatedLists.length > 0 ? updatedLists[0] : null);
        toast.success('Список удален!');
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            {
                lists.length < 1 ? (
                    <div className="flex flex-col items-center justify-center text-text text-center">
                        <form className="space-y-4" action="" onSubmit={() => createList({ name: listName, onCreate: handleCreateList })}>
                            <h2>У вас пока нет списков</h2>
                            <h4>Создать список:</h4>
                            <Input newTodo={listName} setNewTodo={setListName} />
                        </form>
                    </div>

                ) : (
                    <>
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 items-center justify-between mb-6 relative">
                            <h1 className="text-3xl font-bold text-center text-text">{selectedList?.name}</h1>
                            <button onClick={() => setOpenSelect(!openSelect)} className="text-text text-xl flex items-end">Выбрать список {!openSelect ? <ChevronDown /> : <ChevronUp />}</button>
                            {
                                openSelect && (
                                    <div className="absolute top-20 sm:top-12 left-0 w-full bg-white rounded-lg rounded-t-none shadow-lg z-10 border-[1px] border-t-0 border-text">
                                        <ul className="text-text">
                                            {
                                                lists.map((list: any) => (
                                                    <li key={list.listId} onClick={() => { setOpenSelect(false); setSelectedList(list)}} className="p-2 hover:text-blue cursor-pointer">{list.name} <X className="float-right" onClick={() => deleteList(list.listId)} /></li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                        <form onSubmit={addTodo} className="mb-4">
                            <Input newTodo={newTodo} setNewTodo={setNewTodo} />
                        </form>
                        <ul>
                            {
                                filteredTodos?.length === 0 ? (
                                    <p className="text-center text-text">Задачи отсутствуют</p>
                                ) :
                                    filteredTodos.map((todo: any) => (
                                        <Item key={todo.id} {...todo} changeTodo={changeTodo} onToggle={toggleTodo} onDelete={deleteTodo} />
                                    ))}
                        </ul>
                    </>
                )
            }
        </div>
    )
}