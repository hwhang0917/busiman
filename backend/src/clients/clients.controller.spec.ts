import { Test, TestingModule } from '@nestjs/testing';
import { mockClientServiceFunctions } from 'src/mock/service.mock';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        { provide: ClientsService, useValue: mockClientServiceFunctions },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    clientsService = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(clientsService).toBeDefined();
  });
});
