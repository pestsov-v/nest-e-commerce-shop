import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  price: number;
  @ApiProperty({ required: true })
  @IsBoolean()
  active: boolean;
}
