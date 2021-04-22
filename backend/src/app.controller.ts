import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Private } from './auth/private.decorator';
import { LoginInput } from './employees/dto/login.dto';
import { EmployeesService } from './employees/employees.service';

@Controller()
export class AppController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Private()
  @Get()
  test() {
    console.log('TESTING');
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginInput) {
    return this.employeesService.login(loginDto);
  }
}
