import { Repository } from 'typeorm';

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

export const mockRepositoryFunctions = {
  find: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
};
