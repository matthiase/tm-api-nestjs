import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../task-status.enum'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatusValues = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any) {
    value = value.toUpperCase()
    if (this.isValidStatus(value)) {
      return value
    }
    throw new BadRequestException(`"${value}" is an invalid task status`)
  }

  private isValidStatus(value: any): boolean {
    return this.allowedStatusValues.indexOf(value) !== -1
  }
}
