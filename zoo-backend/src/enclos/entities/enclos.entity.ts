import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
