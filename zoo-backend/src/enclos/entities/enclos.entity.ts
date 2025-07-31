import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Animal } from '../../animaux/entities/animal.entity';

@Entity()
export class Enclos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  type: string; // e.g., 'savane', 'aquatique', 'voliere'

  @OneToMany(() => Animal, (animal) => animal.enclos)
  animaux: Animal[];
}
