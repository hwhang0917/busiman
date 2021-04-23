import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Admin } from 'src/auth/decorators/admin.decorator';
import { Approved } from 'src/auth/decorators/approved.decorator';
import { UpdateAccountInput } from './dto/update-account.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { X_JWT_HEADER } from 'src/common/common.constant';

@ApiTags('Employees')
@ApiHeader({
  name: X_JWT_HEADER,
  description: 'Login JWT(Json Web Token)',
})
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Approved()
  @Get()
  getAllEmployees() {
    return this.employeesService.findAll();
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
    return this.employeesService.updateAccount(authUser, { id, ...updateDto });
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
