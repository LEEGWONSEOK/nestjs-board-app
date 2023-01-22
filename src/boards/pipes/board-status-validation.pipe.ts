import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../interfaces/board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any) {
    const valueStatus = value.status.toUpperCase();

    if (!this.isStatusValid(valueStatus)) {
      throw new BadRequestException(
        `'${valueStatus}' isn't in the status options`,
      );
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index != -1;
  }
}
