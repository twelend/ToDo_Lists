export interface BurgerProps {
    toggleDark: () => void;
    isDark: string;
    setListType: React.Dispatch<React.SetStateAction<string>>;
    listType: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setLists: any;
}
