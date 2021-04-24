import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockRepository,
  mockRepositoryFunctions,
} from 'src/mock/repository.mock';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

describe('ClientsService', () => {
  let service: ClientsService;
  let clientRepository: MockRepository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepositoryFunctions,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    clientRepository = module.get(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(clientRepository).toBeDefined();
  });
});
