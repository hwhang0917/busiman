import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { X_JWT_HEADER } from 'src/common/common.constant';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Admin } from 'src/auth/decorators/admin.decorator';
import { Approved } from 'src/auth/decorators/approved.decorator';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { UpdateAccountInput } from './dto/update-account.dto';
import {
  FilterAccountInput,
  FilterAccountParams,
} from './dto/filter-account.dto';

@ApiTags('Employees')
@ApiHeader({
  name: X_JWT_HEADER,
  description: 'Login JWT(Json Web Token)',
  required: true,
})
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Approved()
  @ApiQuery({ type: FilterAccountParams })
  @Get()
  getAllEmployees(@Query() query: FilterAccountInput) {
    return this.employeesService.findAll(query);
  }

  @Approved()
  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeesService.findById(id);
  }

  @Approved()
  @Put(':id')
  updateEmployee(
    @Param('id') id: number,
    @AuthUser() authUser: Employee,
    @Body() updateDto: UpdateAccountInput,
  ) {
    return this.employeesService.updateAccount(authUser, id, { ...updateDto });
  }

  @Admin()
  @Put(':id/approve')
  approveEmployee(@Param('id') id: number) {
    return this.employeesService.approveEmployee(id);
  }

  @Admin()
  @Delete(':id')
  deleteEmployeeById(@Param('id') id: number) {
    return this.employeesService.delete(id);
  }
}
