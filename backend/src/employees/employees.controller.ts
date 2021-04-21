import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.dto';
import { UpdateAccountInput } from './dto/update-account.dto';
import { EmployeesService } from './employees.service';

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
    @Body() updateDto: UpdateAccountInput,
  ) {
    return this.employeesService.updateAccount(id, updateDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: number) {
    return this.employeesService.delete(id);
  }
}
