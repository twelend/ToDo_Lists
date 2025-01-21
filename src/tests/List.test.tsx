import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { List } from "../components/List";
import { Todo } from "../types/todo.types";
import userEvent from "@testing-library/user-event";

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("List Component", () => {
  const mockSetLists = jest.fn();
  const mockLists = [
    {
      listId: "1",
      name: "Test List",
      tasks: [
        { id: "1", text: "Test Todo 1", completed: false },
        { id: "2", text: "Test Todo 2", completed: true },
      ] as Todo[],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderList = async (listType = "all") => {
    const result = render(
      <List listType={listType} setLists={mockSetLists} lists={mockLists} />
    );

    // Wait for selectedList to be set
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });

    return result;
  };

  test("renders without crashing", async () => {
    await renderList();
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  test('shows all todos when listType is "all"', async () => {
    await renderList("all");
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  test('shows only completed todos when listType is "completed"', async () => {
    await renderList("completed");
    expect(screen.queryByText("Test Todo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  test('shows only uncompleted todos when listType is "uncompleted"', async () => {
    await renderList("uncompleted");
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Todo 2")).not.toBeInTheDocument();
  });

  test("adds new todo", async () => {
    await renderList();
    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    await userEvent.type(input, "New Todo");
    await fireEvent.submit(form);

    expect(mockSetLists).toHaveBeenCalled();
    const updatedLists = mockSetLists.mock.calls[0][0];
    expect(updatedLists[0].tasks).toHaveLength(3);
    expect(updatedLists[0].tasks[2].text).toBe("New Todo");
  });

  test("deletes todo", async () => {
    await renderList();
    const deleteButton = screen
      .getAllByTestId("trash-icon")[0]
      .closest("button");
    await userEvent.click(deleteButton!);

    expect(mockSetLists).toHaveBeenCalled();
    const updatedLists = mockSetLists.mock.calls[0][0];
    expect(updatedLists[0].tasks).toHaveLength(1);
  });

  test("shows empty message when no todos", async () => {
    await render(
      <List
        listType="all"
        setLists={mockSetLists}
        lists={[{ listId: "1", name: "Empty List", tasks: [] }]}
      />
    );
    expect(screen.getByText("Задачи отсутствуют")).toBeInTheDocument();
  });
});
