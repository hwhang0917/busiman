import { Test, TestingModule } from '@nestjs/testing';
import { mockEmployeeServiceFunctions } from 'src/mock/service.mock';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let employeeService: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        { provide: EmployeesService, useValue: mockEmployeeServiceFunctions },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    employeeService = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(employeeService).toBeDefined();
  });
});
