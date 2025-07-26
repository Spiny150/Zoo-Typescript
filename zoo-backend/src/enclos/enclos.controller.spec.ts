import { Test, TestingModule } from '@nestjs/testing';
import { EnclosController } from './enclos.controller';

describe('EnclosController', () => {
  let controller: EnclosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnclosController],
    }).compile();

    controller = module.get<EnclosController>(EnclosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
