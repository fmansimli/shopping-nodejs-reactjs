import { IsString, IsOptional, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryProductDto {
  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => value.split(','))
  populate?: string[];

  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => value.split(','))
  fields: string[];
}
