import axios from "axios";
import { tasksService } from "./task.services";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TasksService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getTasks fetches tasks", async () => {
    const tasks = [{ id: 1, title: "Task 1", status: false }];
    mockedAxios.get.mockResolvedValueOnce({ data: tasks });

    const result = await tasksService.getTasks();
    expect(result).toEqual(tasks);
    expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:5173/tasks.json");
  });

  test("resetTasks updates tasks", async () => {
    const tasks = [{ id: 1, title: "Task 1", status: false }];
    mockedAxios.put.mockResolvedValueOnce({ data: tasks });

    const result = await tasksService.resetTasks(tasks);
    expect(result).toEqual(tasks);
    expect(mockedAxios.put).toHaveBeenCalledWith("http://localhost:5173/tasks.json", tasks);
  });

  test("deleteTask removes a task", async () => {
    const tasks = [{ id: 1, title: "Task 1", status: false }];
    mockedAxios.get.mockResolvedValueOnce({ data: tasks });

    const result = await tasksService.deleteTask(1);
    expect(result).toEqual([]);
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.put).toHaveBeenCalledWith("http://localhost:5173/tasks.json", []);
  });

  test("setStatusTask toggles task status", async () => {
    const tasks = [{ id: 1, title: "Task 1", status: false }];
    mockedAxios.get.mockResolvedValueOnce({ data: tasks });
    mockedAxios.put.mockResolvedValueOnce({ data: [{ id: 1, title: "Task 1", status: true }] });

    const result = await tasksService.setStatusTask(1, false);
    expect(result).toEqual([{ id: 1, title: "Task 1", status: true }]);
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.put).toHaveBeenCalledWith("http://localhost:5173/tasks.json", [{ id: 1, title: "Task 1", status: true }]);
  });
});
