import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import DropdownTasks from "./DropdownTasks";
import { tasksService } from "../../services/task.services";

// Мокаем tasksService
jest.mock("../../services/task.services");

const queryClient = new QueryClient();

describe("DropdownTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dropdown button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DropdownTasks />
      </QueryClientProvider>
    );

    const button = screen.getByText(/Whats needs to be done?/i);
    expect(button).toBeInTheDocument();
  });

  test("toggles dropdown visibility", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DropdownTasks />
      </QueryClientProvider>
    );

    const button = screen.getByText(/Whats needs to be done?/i);
    fireEvent.click(button);
    expect(screen.getByText(/items left/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText(/items left/i)).not.toBeInTheDocument();
  });

  test("filters tasks correctly", async () => { 
    (tasksService.getTasks as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: "Task 1", status: false },
      { id: 2, title: "Task 2", status: true },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <DropdownTasks />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText(/Whats needs to be done?/i));
 // Проверяем, что отображаются все задачи
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();

    // Фильтруем по "active"
    fireEvent.click(screen.getByText(/Active/i));
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();

    // Фильтруем по "completed"
    fireEvent.click(screen.getByText(/Completed/i));
    expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });
});