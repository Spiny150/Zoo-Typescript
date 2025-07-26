import { Test, TestingModule } from '@nestjs/testing';
import { EnclosService } from './enclos.service';

describe('EnclosService', () => {
  let service: EnclosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnclosService],
    }).compile();

    service = module.get<EnclosService>(EnclosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
