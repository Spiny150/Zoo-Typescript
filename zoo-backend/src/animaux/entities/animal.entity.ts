// src/animaux/entities/animal.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Enclos } from '../../enclos/entities/enclos.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column({ default: 100 })
  health: number;

  @ManyToOne(() => Enclos, (enclos) => enclos.animaux)
  enclos: Enclos;
}
