import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth/decorators/public.decorator';
import { CreateAccountInput } from './employees/dto/create-account.dto';
import { LoginInput } from './employees/dto/login.dto';
import { EmployeesService } from './employees/employees.service';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginInput) {
    return this.employeesService.login(loginDto);
  }

  @Public()
  @Post('create')
  createEmployee(@Body() createAccountDto: CreateAccountInput) {
    return this.employeesService.createAccount(createAccountDto);
  }
}
