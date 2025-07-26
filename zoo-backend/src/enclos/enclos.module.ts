import { Module } from '@nestjs/common';
import { EnclosController } from './enclos.controller';
import { EnclosService } from './enclos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enclos } from './entities/enclos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enclos])],
  controllers: [EnclosController],
  providers: [EnclosService]
})
export class EnclosModule {}
