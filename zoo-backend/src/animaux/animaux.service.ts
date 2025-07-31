// animaux.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Injectable()
export class AnimauxService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepo: Repository<Animal>,
  ) {}

  async create(dto: CreateAnimalDto): Promise<Animal> {
    const animal = this.animalRepo.create(dto);
    if (dto.enclosId) {
      animal.enclos = { id: dto.enclosId } as any;
    }
    const newAnimal = await this.animalRepo.save(animal);
    return this.findOne(newAnimal.id);
  }

  findAll() {
    return this.animalRepo.find({ relations: ['enclos'] });
  }

  findOne(id: number) {
    return this.animalRepo.findOne({ where: { id }, relations: ['enclos'] });
  }

  findByName(name: string) {
    return this.animalRepo.findOne({ where: { name }, relations: ['enclos'] });
  }

  deleteWithId(id: number) {
    return this.animalRepo.delete(id);
  }

  async soignerAnimal(id: number) {
    const animal = await this.animalRepo.findOneBy({ id });
    if (animal) {
      animal.health = 100;
      return this.animalRepo.save(animal);
    }
    return null; // Or throw an error if animal not found
  }
}
