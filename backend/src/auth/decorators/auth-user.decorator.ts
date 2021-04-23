import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Employee } from 'src/employees/entities/employee.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const { user }: { user: Employee } = context.switchToHttp().getRequest();
    return user;
  },
);
