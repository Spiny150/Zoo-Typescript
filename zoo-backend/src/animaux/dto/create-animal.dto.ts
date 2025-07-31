import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, IsOptional } from 'class-validator';

export class CreateAnimalDto {
  @ApiProperty({
    description: 'The name of the animal',
    example: 'Rex',
  })
  @IsString() @Length(3, 20)
  name: string;

  @ApiProperty({
    description: 'The species of the animal',
    example: 'Dog',
  })
  species: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  enclosId?: number;
}
