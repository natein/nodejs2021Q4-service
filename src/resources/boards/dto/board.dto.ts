import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IColumn } from '../../../interfaces/types';

export default class BoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  columns: IColumn[];
}
