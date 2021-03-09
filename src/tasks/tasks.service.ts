import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskFilterDto } from './dto/task-filter.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTasks(filterDto: TaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user)
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id)
    if (task) {
      return task
    }
    throw new NotFoundException(`Task with ID "${id}" not found`)
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    await task.save()
    return task
  }
}
