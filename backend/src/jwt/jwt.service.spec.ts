import * as jwt from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { JwtService } from './jwt.service';

const TOKEN = 'TOKEN';
const TEST_PRIVATE_KEY = 'testPrivateKey';
const USER_ID = 1;

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => TOKEN),
    verify: jest.fn(() => ({
      id: USER_ID,
    })),
  };
});

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        { provide: CONFIG_OPTIONS, useValue: { privateKey: TEST_PRIVATE_KEY } },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign', () => {
    it('should return a signed token', () => {
      const signArgs = { id: USER_ID };
      const token = service.sign(signArgs);

      expect(typeof token).toBe('string');
      expect(jwt.sign).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith(signArgs, TEST_PRIVATE_KEY);
    });
  });

  describe('verify', () => {
    it('should return the decoded token', () => {
      const decodedToken = service.verify(TOKEN);

      expect(jwt.verify).toHaveBeenCalled();
      expect(jwt.verify).toHaveBeenCalledWith(TOKEN, TEST_PRIVATE_KEY);
      expect(decodedToken).toEqual({ id: USER_ID });
    });
  });
});
