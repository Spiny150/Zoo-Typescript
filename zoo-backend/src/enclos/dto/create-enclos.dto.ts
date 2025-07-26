import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber, Min } from 'class-validator';

export class CreateEnclosDto {
  @ApiProperty({ description: 'Name of the enclosure', example: 'Savane Africaine' })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({ description: 'Capacity of the enclosure', example: 10 })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ description: 'Type of the enclosure (e.g., savane, aquatique)', example: 'savane' })
  @IsString()
  @Length(3, 30)
  type: string;
}
