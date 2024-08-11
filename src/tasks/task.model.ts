// src/tasks/task.model.ts

import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ description: 'The unique identifier of the task' })
  id: number;

  @ApiProperty({ description: 'The title of the task' })
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  description: string;

  @ApiProperty({
    enum: ['low', 'medium', 'high'],
    description: 'The priority of the task',
  })
  priority: 'low' | 'medium' | 'high';

  @ApiProperty({ type: Date, description: 'The due date of the task' })
  dueDate: Date;

  @ApiProperty({
    enum: ['pending', 'in-progress', 'completed'],
    description: 'The status of the task',
  })
  status: 'pending' | 'in-progress' | 'completed';
}
