import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import {
  MockRepository,
  mockRepositoryFunctions,
} from 'src/mock/repository.mock';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let jwtService: JwtService;
  let employeeRepository: MockRepository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepositoryFunctions,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    jwtService = module.get<JwtService>(JwtService);
    employeeRepository = module.get(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });
});
