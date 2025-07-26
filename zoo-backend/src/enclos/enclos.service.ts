import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enclos } from './entities/enclos.entity';
import { CreateEnclosDto } from './dto/create-enclos.dto';

@Injectable()
export class EnclosService {
  constructor(
    @InjectRepository(Enclos)
    private readonly enclosRepo: Repository<Enclos>,
  ) {}

  create(createEnclosDto: CreateEnclosDto): Promise<Enclos> {
    const enclos = this.enclosRepo.create(createEnclosDto);
    return this.enclosRepo.save(enclos);
  }

  findAll(): Promise<Enclos[]> {
    return this.enclosRepo.find();
  }

  findOne(id: number): Promise<Enclos | undefined> {
    return this.enclosRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.enclosRepo.delete(id);
  }
}
