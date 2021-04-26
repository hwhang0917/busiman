import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Approved } from 'src/auth/decorators/approved.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { X_JWT_HEADER } from 'src/common/common.constant';
import { Employee } from 'src/employees/entities/employee.entity';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.dto';
import { FilterClientInput, FilterClientParams } from './dto/filter-client.dto';
import { UpdateClientInput } from './dto/update-client.dto';

@ApiTags('Clients')
@ApiHeader({
  name: X_JWT_HEADER,
  description: 'Login JWT(Json Web Token)',
})
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  @Approved()
  @ApiQuery({ type: FilterClientParams })
  @Get()
  getAllClients(@Query() query: FilterClientInput) {
    return this.clientsService.findAll(query);
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
  @ApiBody({ type: UpdateClientInput, required: false })
  @Put(':id')
  updateClient(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientInput,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Approved()
  @Delete(':id')
  deleteClient(@Param('id') id: number) {
    return this.clientsService.delete(id);
  }
}
