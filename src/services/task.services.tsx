import axios, { AxiosResponse } from "axios";
import { ITasks } from "../pages/home/types";

class TasksService {
    private tasksUrl = "http://localhost:5173/tasks.json"; 

    async getTasks(): Promise<ITasks[]> {
        const response: AxiosResponse<ITasks[]> = await axios.get(this.tasksUrl);
        return response.data;
    }

    async resetTasks(tasks: ITasks[]): Promise<ITasks[]> {
        try {
            // Используем PUT для обновления
            const response: AxiosResponse<ITasks[]> = await axios.put(this.tasksUrl, tasks);
            return response.data;
        } catch (error) {
            console.error("Error updating tasks:", error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    // Удаление задачи по id
    async deleteTask(id: number) {
        // Сначала получаем все задачи
        const tasks: ITasks[] = await this.getTasks();
        const updatedTasks = tasks.filter(task => task.id !== id);
        // Обновляем задачи на сервере await this.resetTasks(updatedTasks);
        return updatedTasks;
    }

    async setStatusTask(id: number, status: boolean) {
        const tasks: ITasks[] = await this.getTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = !status;
            // Дожидаемся завершения операции
            const updatedData = await this.resetTasks(tasks);
            return updatedData;
        }
        throw new Error("Task not found");
    }
}

export const tasksService = new TasksService();