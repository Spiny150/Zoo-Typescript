import { EnclosDto } from '@api/model/enclosDto';

export interface AnimalDto {
  id: number;
  name: string;
  species: string;
  health: number;
  enclos?: EnclosDto;
}
