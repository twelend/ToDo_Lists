import './App.css'
import { toast, Toaster } from 'sonner'
import { List } from './components/List'
import { useEffect, useState } from 'react'
import Burger from './components/Burger';
import { useLS } from './hooks/useLS';
import { Todo } from './types/todo.types';

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('dark') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('dark', isDark.toString());
  }, [isDark]);

  const toggleDark = () => {
    if (isDark === true) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
    toast.success('Тема успешно изменена!');
  };

  const [listType, setListType] = useState('all')
  const [name, setName] = useState("")
  const [lists, setLists] = useLS<{ listId: string, name: string, tasks: Todo[] }[]>("lists", []);

  return (
    <main>
      <Toaster />
      <div className="relative min-h-screen py-3 px-5">
        <Burger setLists={setLists} setName={setName} toggleDark={toggleDark} isDark={isDark.toString()} setListType={setListType} listType={listType} name={name} />
        <List listType={listType} name={name} setLists={setLists} lists={lists} />
      </div>
    </main>
  )
}

export default App
