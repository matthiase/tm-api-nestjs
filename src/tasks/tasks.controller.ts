import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { GetUser } from "src/auth/get-user.decorator"
import { User } from "src/auth/user.entity"
import { CreateTaskDto } from "./dto/create-task.dto"
import { TaskFilterDto } from "./dto/task-filter.dto"
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe"
import { TaskStatus } from "./task-status.enum"
import { Task } from "./task.entity"
import { TasksService } from "./tasks.service"

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger: Logger = new Logger("TasksController")
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: TaskFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} requesting all tasks. Filters ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto, user)
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User ${user.username} creating task. Data: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Delete("/:id")
  deleteTaskById(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user)
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user)
  }
}
