import { IsString, MinLength, MaxLength, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  name: string;

  @IsNumber()
  @Min(5)
  price: number;

  @IsString()
  @MinLength(10)
  description: string;

  @IsNumber()
  @Min(0)
  sku: number;
}
