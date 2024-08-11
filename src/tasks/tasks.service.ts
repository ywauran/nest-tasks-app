// src/tasks/tasks.service.ts

import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      priority: 'low',
      dueDate: new Date(),
      status: 'pending',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      priority: 'medium',
      dueDate: new Date(),
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      priority: 'high',
      dueDate: new Date(),
      status: 'completed',
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description 4',
      priority: 'low',
      dueDate: new Date(),
      status: 'pending',
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Description 5',
      priority: 'medium',
      dueDate: new Date(),
      status: 'in-progress',
    },
    {
      id: 6,
      title: 'Task 6',
      description: 'Description 6',
      priority: 'high',
      dueDate: new Date(),
      status: 'completed',
    },
    {
      id: 7,
      title: 'Task 7',
      description: 'Description 7',
      priority: 'low',
      dueDate: new Date(),
      status: 'pending',
    },
    {
      id: 8,
      title: 'Task 8',
      description: 'Description 8',
      priority: 'medium',
      dueDate: new Date(),
      status: 'in-progress',
    },
    {
      id: 9,
      title: 'Task 9',
      description: 'Description 9',
      priority: 'high',
      dueDate: new Date(),
      status: 'completed',
    },
    {
      id: 10,
      title: 'Task 10',
      description: 'Description 10',
      priority: 'low',
      dueDate: new Date(),
      status: 'pending',
    },
  ];

  getAllTasks(
    search?: string,
    status?: 'pending' | 'in-progress' | 'completed',
    priority?: 'low' | 'medium' | 'high',
    page: number = 1,
    pageSize: number = 10,
    sortBy?: 'status' | 'priority' | 'dueDate',
  ): {
    tasks: Task[];
    totalPages: number;
    totalRows: number;
    limit: number;
    currentPage: number;
  } {
    let filteredTasks = this.tasks;

    if (search) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (priority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priority,
      );
    }

    if (sortBy) {
      filteredTasks = filteredTasks.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }

    const totalRows = filteredTasks.length;
    const totalPages = Math.ceil(totalRows / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return {
      tasks: paginatedTasks,
      totalPages,
      totalRows,
      limit: pageSize,
      currentPage: page,
    };
  }

  getTaskById(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    dueDate: Date,
  ): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      priority,
      dueDate,
      status: 'pending',
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(
    id: number,
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    dueDate: Date,
    status: 'pending' | 'in-progress' | 'completed',
  ): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return null;

    const updatedTask = {
      ...this.tasks[taskIndex],
      title,
      description,
      priority,
      dueDate,
      status,
    };

    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
