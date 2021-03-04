import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v1 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskFilterDto } from './dto/task-filter.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getFilteredTasks(filter: TaskFilterDto): Task[] {
    const { status, search } = filter
    let tasks = this.getAllTasks()
    if (status) {
      tasks = tasks.filter((task) => task.status === status)
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search)
      )
    }

    return tasks
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task
  }

  deleteTask(id: string): Task {
    const index: number = this.tasks.findIndex((item) => item.id === id)
    if (index > -1) {
      const task = this.tasks[index]
      this.tasks.splice(index, 1)
      return task
    }
    return null
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id)
    if (task) {
      task.status = status
      return task
    }
    // Return 404
    return null
  }
}
