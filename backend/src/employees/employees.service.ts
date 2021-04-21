import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UpdateAccountInput } from './dto/update-account.dto';
import { CreateAccountInput } from './dto/create-account.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employees: Repository<Employee>,
    private readonly jwtService: JwtService,
  ) {}

  //   Create
  async createAccount({
    email,
    password,
    name,
  }: CreateAccountInput): Promise<Employee> {
    if (!email) {
      throw new BadRequestException('E-mail is reuqired.');
    }
    if (!password) {
      throw new BadRequestException('Password is required.');
    }
    if (!name) {
      throw new BadRequestException('Name is required.');
    }
    const exists = await this.employees.findOne({ email });
    if (exists) {
      throw new ConflictException('E-mail already exists.');
    }
    const newUser = this.employees.create({ email, password, name });
    return await this.employees.save(newUser);
  }

  //   Read
  async findAll(): Promise<Employee[]> {
    return await this.employees.find();
  }
  async findById(id: number): Promise<Employee> {
    const employee = await this.employees.findOne(id, {
      select: ['id', 'email', 'name', 'photoUrl', 'introduction'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id:${id} not found.`);
    }
    return employee;
  }

  //   Auth
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    if (!email) {
      throw new BadRequestException('E-mail is required.');
    }
    if (!password) {
      throw new BadRequestException('Password is required.');
    }
    const employee = await this.employees.findOne({ email });
    console.log('login');
    if (!employee) {
      throw new UnauthorizedException('E-mail does not exists.');
    }
    const validPassword = await employee.checkPassword(password);
    if (validPassword) {
      const payload = { id: employee.id };
      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('Invalid password.');
    }
  }

  //   Update
  async updateAccount(
    id: number,
    {
      email,
      password,
      name,
      photoUrl,
      contact,
      introduction,
      title,
    }: UpdateAccountInput,
  ) {
    const employee = await this.findById(id);
    if (email) {
      if (await this.employees.findOne({ email })) {
        throw new ConflictException('E-mail already exists.');
      } else {
        employee.email = email;
      }
    }
    if (password) {
      employee.password = password;
    }
    if (name) {
      employee.name = name;
    }
    if (photoUrl) {
      employee.photoUrl = photoUrl;
    }
    if (contact) {
      employee.contact = contact;
    }
    if (introduction) {
      employee.introduction = introduction;
    }
    if (title) {
      employee.title = title;
    }
    try {
      return await this.employees.save(employee);
    } catch (e) {
      throw e;
    }
  }

  //   Delete
  async delete(id: number): Promise<Employee> {
    const employee = await this.employees.findOneOrFail(id);
    return await this.employees.remove(employee);
  }
}
