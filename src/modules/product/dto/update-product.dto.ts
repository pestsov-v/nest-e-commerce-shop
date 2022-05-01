import { IsBoolean, IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;

  @Min(0)
  @IsNumber()
  price?: number;

  @IsBoolean()
  active?: boolean;
}
