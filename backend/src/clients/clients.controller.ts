import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Approved } from 'src/auth/decorators/approved.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { X_JWT_HEADER } from 'src/common/common.constant';
import { UpdateAccountInput } from 'src/employees/dto/update-account.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.dto';

@ApiTags('Clients')
@ApiHeader({
  name: X_JWT_HEADER,
  description: 'Login JWT(Json Web Token)',
})
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  @Approved()
  @Get()
  getAllClients() {
    return this.clientsService.findAll();
  }

  @Approved()
  @Get(':id')
  getClientById(@Param('id') id: number) {
    return this.clientsService.findById(id);
  }

  @Approved()
  @Post()
  createClient(
    @AuthUser() authUser: Employee,
    @Body() createClientDto: CreateClientInput,
  ) {
    return this.clientsService.create(authUser, createClientDto);
  }

  @Approved()
  @Put(':id')
  updateClient(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateAccountInput,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Approved()
  @Delete(':id')
  deleteClient(@Param('id') id: number) {
    return this.clientsService.delete(id);
  }
}
