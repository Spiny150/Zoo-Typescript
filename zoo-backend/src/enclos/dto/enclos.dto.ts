import { ApiProperty } from '@nestjs/swagger';
import { AnimalDto } from '../../animaux/dto/animal.dto';

export class EnclosDto {
  @ApiProperty({ description: 'Unique identifier of the enclosure', example: 1 })
  id: number;

  @ApiProperty({ description: 'Name of the enclosure', example: 'Savane Africaine' })
  name: string;

  @ApiProperty({ description: 'Capacity of the enclosure', example: 10 })
  capacity: number;

  @ApiProperty({ description: 'Type of the enclosure (e.g., savane, aquatique)', example: 'savane' })
  type: string;

  @ApiProperty({ type: () => [AnimalDto], description: 'List of animals in the enclosure' })
  animaux?: AnimalDto[];
}
