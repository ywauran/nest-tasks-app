// src/common/dto/response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ description: 'The HTTP status code' })
  statusCode: number;

  @ApiProperty({
    description: 'The result of the request, could be an object or an array',
  })
  result: T;

  @ApiProperty({ description: 'A message describing the outcome' })
  message: string;
}
