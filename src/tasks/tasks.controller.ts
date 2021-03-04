import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskFilterDto } from './dto/task-filter.dto'
import { Task, TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filter: TaskFilterDto): Task[] {
    if (Object.keys(filter)) {
      return this.tasksService.getFilteredTasks(filter)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task {
    const task = this.tasksService.deleteTask(id)
    if (!task) {
      // Return 404
    }
    return task
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
