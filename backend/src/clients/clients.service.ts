import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { DNEerr } from 'src/errors/message.error';
import { Repository } from 'typeorm';
import { CreateClientInput } from './dto/create-client.dto';
import { FilterClientInput } from './dto/filter-client.dto';
import { UpdateClientInput } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private readonly clients: Repository<Client>,
  ) {}

  //   Create
  async create(authUser: Employee, createClientInput: CreateClientInput) {
    const newClient = this.clients.create({
      ...createClientInput,
      addedBy: authUser,
    });
    try {
      return await this.clients.save(newClient);
    } catch (error) {
      throw error;
    }
  }

  //   Read
  async findAll(query: FilterClientInput): Promise<Client[]> {
    return await this.clients.find(query);
  }
  async findById(id: number): Promise<Client> {
    const client = await this.clients.findOne(id);
    if (!client) {
      throw new NotFoundException(DNEerr.client);
    }
    return client;
  }

  //   Update
  async update(
    id: number,
    {
      name,
      contact,
      introduction,
      isOrganization,
      photoUrl,
      title,
      website,
    }: UpdateClientInput,
  ): Promise<Client> {
    const client = await this.clients.findOne(id);
    if (!client) {
      throw new NotFoundException(DNEerr.client);
    }
    if (name) client.name = name;
    if (contact) client.contact = contact;
    if (introduction) client.introduction = introduction;
    if (isOrganization) client.isOrganization = isOrganization;
    if (photoUrl) client.photoUrl = photoUrl;
    if (title) client.title = title;
    if (website) client.website = website;

    try {
      return this.clients.save(client);
    } catch (e) {
      throw e;
    }
  }

  //   Delete
  async delete(id: number): Promise<Client> {
    const client = await this.clients.findOne(id);
    if (!client) {
      throw new NotFoundException(DNEerr.client);
    }
    return await this.clients.remove(client);
  }
}
