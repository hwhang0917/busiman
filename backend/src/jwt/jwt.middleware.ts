import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { X_JWT_HEADER } from 'src/common/common.constant';
import { EmployeesService } from 'src/employees/employees.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeesService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (X_JWT_HEADER in req.headers) {
      const token = req.headers[X_JWT_HEADER];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const employee = await this.employeeService.findById(decoded['id']);
          req['user'] = employee;
        } catch (e) {
          throw e;
        }
      }
    }
    next();
  }
}
