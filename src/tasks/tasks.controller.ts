// src/tasks/tasks.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { ResponseDto } from '../common/response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks with pagination and sorting' })
  @ApiResponse({ status: 200, description: 'Return paginated tasks.' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['pending', 'in-progress', 'completed'],
    description: 'Filter by status',
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: ['low', 'medium', 'high'],
    description: 'Filter by priority',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Number of tasks per page',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['status', 'priority', 'dueDate'],
    description: 'Sort by field',
  })
  getAllTasks(
    @Query('search') search?: string,
    @Query('status') status?: 'pending' | 'in-progress' | 'completed',
    @Query('priority') priority?: 'low' | 'medium' | 'high',
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('sortBy') sortBy?: 'status' | 'priority' | 'dueDate',
  ): ResponseDto<{
    tasks: Task[];
    totalPages: number;
    totalRows: number;
    limit: number;
    currentPage: number;
  }> {
    const { tasks, totalPages, totalRows, limit, currentPage } =
      this.tasksService.getAllTasks(
        search,
        status,
        priority,
        Number(page),
        Number(pageSize),
        sortBy,
      );

    return {
      statusCode: 200,
      result: { tasks, totalPages, totalRows, limit, currentPage },
      message: 'Tasks retrieved successfully',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Return a task by ID.' })
  @ApiParam({ name: 'id', description: 'The ID of the task' })
  getTaskById(@Param('id') id: string): ResponseDto<Task> {
    const task = this.tasksService.getTaskById(Number(id));

    return {
      statusCode: 200,
      result: task,
      message: 'Task retrieved successfully',
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('priority') priority: 'low' | 'medium' | 'high',
    @Body('dueDate') dueDate: string,
  ): ResponseDto<Task> {
    const task = this.tasksService.createTask(
      title,
      description,
      priority,
      new Date(dueDate),
    );

    return {
      statusCode: 201,
      result: task,
      message: 'Task created successfully',
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the task' })
  updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('priority') priority: 'low' | 'medium' | 'high',
    @Body('dueDate') dueDate: string,
    @Body('status') status: 'pending' | 'in-progress' | 'completed',
  ): ResponseDto<Task> {
    const task = this.tasksService.updateTask(
      Number(id),
      title,
      description,
      priority,
      new Date(dueDate),
      status,
    );

    return {
      statusCode: 200,
      result: task,
      message: 'Task updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 204,
    description: 'The task has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the task' })
  deleteTask(@Param('id') id: string): ResponseDto<null> {
    this.tasksService.deleteTask(Number(id));

    return {
      statusCode: 204,
      result: null,
      message: 'Task deleted successfully',
    };
  }
}
