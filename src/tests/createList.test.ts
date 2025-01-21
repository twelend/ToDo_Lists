import { createList } from '../helpers/CreateList';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    }
}));

describe('createList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('should show error toast if name is empty', () => {
        const onCreate = jest.fn();
        createList({ name: '', onCreate });

        expect(toast.error).toHaveBeenCalledWith('Введите название списка!');
        expect(onCreate).not.toHaveBeenCalled();
    });

    test('should create a new list and call onCreate', () => {
        const name = 'New List';
        const onCreate = jest.fn();

        createList({ name, onCreate });

        const lists = JSON.parse(localStorage.getItem('lists') || '[]');
        expect(lists).toHaveLength(1);
        expect(lists[0]).toHaveProperty('name', name.trim());
        expect(lists[0]).toHaveProperty('tasks', []);
        expect(onCreate).toHaveBeenCalledWith(lists[0]);
        expect(toast.success).toHaveBeenCalledWith('Список успешно создан!');
    });

    test('should update localStorage with the new list', () => {
        const name = 'New List';
        const onCreate = jest.fn();

        createList({ name, onCreate });

        const lists = JSON.parse(localStorage.getItem('lists') || '[]');
        expect(lists).toHaveLength(1);
        expect(lists[0]).toHaveProperty('name', name.trim());
        expect(lists[0]).toHaveProperty('tasks', []);
    });

    test('should not create a new list if name is only whitespace', () => {
        const name = '   ';
        const onCreate = jest.fn();

        createList({ name, onCreate });

        expect(toast.error).toHaveBeenCalledWith('Введите название списка!');
        expect(onCreate).not.toHaveBeenCalled();
    });
});
