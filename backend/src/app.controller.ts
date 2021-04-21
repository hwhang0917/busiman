import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginInput } from './employees/dto/login.dto';
import { EmployeesService } from './employees/employees.service';

@Controller()
export class AppController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginInput) {
    return this.employeesService.login(loginDto);
  }
}
