import { ClientsService } from 'src/clients/clients.service';
import { EmployeesService } from 'src/employees/employees.service';
import { ProjectsService } from 'src/projects/projects.service';

export type MockEmployeeService = Partial<
  Record<keyof EmployeesService, jest.Mock>
>;

export const mockEmployeeServiceFunctions: MockEmployeeService = {
  approveEmployee: jest.fn(),
  createAccount: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  login: jest.fn(),
  updateAccount: jest.fn(),
};

export type MockClientService = Partial<
  Record<keyof ClientsService, jest.Mock>
>;

export const mockClientServiceFunctions: MockClientService = {
  create: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

export type MockProjectService = Partial<
  Record<keyof ProjectsService, jest.Mock>
>;

export const mockProjectServiceFunctions: MockProjectService = {
  createDocument: jest.fn(),
  createProject: jest.fn(),
  deleteDocument: jest.fn(),
  deleteProject: jest.fn(),
  findAllDocuments: jest.fn(),
  findAllProjects: jest.fn(),
  findDocumentById: jest.fn(),
  findProjectById: jest.fn(),
  updateDocument: jest.fn(),
  updateProject: jest.fn(),
};
