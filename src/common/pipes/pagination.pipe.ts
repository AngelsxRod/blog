import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: { page?: string; limit?: string }) {
    const page = Number(value.page) || 1;
    const limit = Number(value.limit) || 10;

    const skip = (page - 1) * limit;

    return {
      page,
      limit,
      skip,
    };
  }
}
