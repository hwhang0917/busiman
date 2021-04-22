import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Admin } from 'src/auth/decorators/admin.decorator';
import { CreateAccountInput } from './dto/create-account.dto';
import { UpdateAccountInput } from './dto/update-account.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Get()
  getAllEmployees() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeesService.findById(id);
  }

  @Post()
  createEmployee(@Body() createAccountDto: CreateAccountInput) {
    return this.employeesService.createAccount(createAccountDto);
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id: number,
    @AuthUser() authUser: Employee,
    @Body() updateDto: UpdateAccountInput,
  ) {
    return this.employeesService.updateAccount(authUser, { id, ...updateDto });
  }

  @Admin()
  @Delete(':id')
  deleteEmployeeById(@Param('id') id: number) {
    return this.employeesService.delete(id);
  }
}
