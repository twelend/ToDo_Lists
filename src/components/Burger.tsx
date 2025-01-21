import { FileCheck2, FileClock, Files, LogIn, Moon, PlusCircle, Sun, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { BurgerProps } from '../types/layout.types'
import { createList } from '../helpers/CreateList'
import { Todo } from '../types/todo.types'



const Burger: React.FC<BurgerProps> = ({ toggleDark, isDark, setListType, listType, setName, name, setLists }) => {
    const [isShow, setIsShow] = React.useState<boolean>(false)
    const [isShowList, setIsShowList] = React.useState<boolean>(false)
    const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false)

    useEffect(() => {
        if (isShow) {
            const timer = setTimeout(() => {
                setIsShowList(true);
            }, 300);
            return () => clearTimeout(timer);
        }
        if (!isShow) {
            const timer = setTimeout(() => {
                setIsShowList(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isShow]);

    const handleCreateList = (newList: { listId: string, name: string, tasks: Todo[] }) => {
        setLists((prevLists: { listId: string, name: string, tasks: Todo[] }[]) => [...prevLists, newList]);
        setIsShow(false);
        setOpenCreateModal(false);
        setName('');
    }
    
    return (
        <nav className={`fixed px-4 sm:px-0 z-50 py-10 bottom-0 left-0 w-full h-[80px] flex flex-row justify-around sm:justify-between gap-8 sm:h-screen bg-white rounded-r-2xl transition-all duration-700 shadow-lg sm:flex-col ${isShow ? 'sm:w-1/3' : 'sm:w-1/12'} `}>
            <button onClick={() => setIsShow(!isShow)} className="hidden items-center justify-center sm:flex">
                {
                    isShow ?
                        <X size={30} className="text-text" />
                        : <LogIn size={30} className="text-text" />
                }
            </button>
            <div className={`flex flex-row sm:flex-col gap-10 sm:gap-6 ${isShow ? 'items-start px-11' : 'items-center'} justify-center`}>
                <button onClick={() => toggleDark()} className='flex items-center gap-2 text-nowrap'>
                    {isDark === 'true' ?
                        <Sun size={20} className="transition-transform duration-300 text-text hover:translate-x-1" /> :
                        <Moon size={20} className="transition-transform duration-300 text-black hover:translate-x-1" />
                    }
                </button>
                <button onClick={() => setListType('all')} title='Все задачи' className='flex items-center gap-2'>
                    <Files size={20} className={`${listType === 'all' ? "text-blue " : "text-text"} transition-transform duration-300 hover:translate-x-1`} />
                    {isShowList ?
                        <span className="text-text">Все задачи</span>
                        : null
                    }
                </button>
                <button onClick={() => setListType('completed')} title='Выполненные задачи' className='flex items-center gap-2'>
                    <FileClock size={20} className={`${listType === 'completed' ? "text-blue " : "text-text"} transition-transform duration-300 hover:translate-x-1`} />
                    {isShowList && <span className="text-text">Выполненные</span>}
                </button>
                <button onClick={() => setListType('uncompleted')} title='Невыполненные задачи' className='flex items-center gap-2'>
                    <FileCheck2 size={20} className={`${listType === 'uncompleted' ? "text-blue " : "text-text"} transition-transform duration-300 hover:translate-x-1`} />
                    {isShowList && <span className="text-text">Невыполненные</span>}
                </button>

            </div>
            <div className={`flex items-center justify-center static sm:relative`}>
                <button onClick={() => setOpenCreateModal(!openCreateModal)} title='Создать список задач' className='flex items-center flex-col gap-1'>
                    {isShowList && <span className="text-text">Создать список задач</span>}
                    <PlusCircle size={30} className="text-text" />
                </button>
                {openCreateModal &&
                    <div className="absolute -top-14 sm:-top-12 right-2 sm:left-0 w-200px sm:w-full h-full flex items-center justify-center">
                        <form onSubmit={() => createList({ name, onCreate: handleCreateList })}>
                            <input type="text" className="w-full p-2 border border-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="ToDo 1" onChange={(e) => setName(e.target.value)} />
                        </form>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Burger