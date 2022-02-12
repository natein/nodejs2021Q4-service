import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
export default class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  userId: string | null = null;
  boardId: string | null = null;
  columnId: string;
}
