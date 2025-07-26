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

  create(dto: CreateAnimalDto) {
    const animal = this.animalRepo.create(dto);
    return this.animalRepo.save(animal);
  }

  findAll() {
    return this.animalRepo.find();
  }

  findOne(id: number) {
    return this.animalRepo.findOneBy({ id });
  }

  findByName(name: string) {
    return this.animalRepo.findOneBy({ name });
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
