import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UpdateAccountInput } from './dto/update-account.dto';
import { CreateAccountInput } from './dto/create-account.dto';
import {
  AuthErr,
  ConflictsErr,
  DNEerr,
  InvalidErr,
  RequiredErr,
} from 'src/errors/message.error';
import { FilterAccountInput } from './dto/filter-account.dto';

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
      throw new BadRequestException(RequiredErr.email);
    }
    if (!password) {
      throw new BadRequestException(RequiredErr.password);
    }
    if (!name) {
      throw new BadRequestException(RequiredErr.name);
    }
    const exists = await this.employees.findOne({ email });
    if (exists) {
      throw new ConflictException(ConflictsErr.email);
    }
    const newUser = this.employees.create({ email, password, name });
    return await this.employees.save(newUser);
  }

  //   Read
  async findAll(query: FilterAccountInput): Promise<Employee[]> {
    const filterParam: FilterAccountInput = {};
    if (query.name) {
      filterParam.name = ILike(`${query.name}%`);
    }
    if (query.approvedByAdmin) {
      filterParam.approvedByAdmin = query.approvedByAdmin;
    }
    return await this.employees.find(filterParam);
  }
  async findById(id: number): Promise<Employee> {
    const employee = await this.employees.findOne(id, {
      select: [
        'id',
        'email',
        'name',
        'photoUrl',
        'introduction',
        'approvedByAdmin',
        'isAdmin',
      ],
    });
    if (!employee) {
      throw new NotFoundException(DNEerr.employee);
    }
    return employee;
  }

  //   Auth
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    if (!email) {
      throw new BadRequestException(RequiredErr.email);
    }
    if (!password) {
      throw new BadRequestException(RequiredErr.password);
    }
    const employee = await this.employees.findOne({ email });
    if (!employee) {
      throw new UnauthorizedException(DNEerr.email);
    }
    const validPassword = await employee.checkPassword(password);
    if (validPassword) {
      const payload = { id: employee.id };
      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException(InvalidErr.password);
    }
  }

  //   Update
  async updateAccount(
    authUser: Employee,
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
    if (authUser.id !== id && !authUser.isAdmin) {
      throw new UnauthorizedException(AuthErr.account);
    }
    const employee = await this.findById(id);
    if (email) {
      if (await this.employees.findOne({ email })) {
        throw new ConflictException(ConflictsErr.email);
      } else {
        employee.email = email;
      }
    }
    if (password) employee.password = password;
    if (name) employee.name = name;
    if (photoUrl) employee.photoUrl = photoUrl;
    if (contact) employee.contact = contact;
    if (introduction) employee.introduction = introduction;
    if (title) employee.title = title;

    try {
      return await this.employees.save(employee);
    } catch (e) {
      throw e;
    }
  }
  async approveEmployee(id: number) {
    const employee = await this.employees.findOne(id);
    if (!employee) {
      throw new NotFoundException(DNEerr.employee);
    }
    employee.approvedByAdmin = true;
    return await this.employees.save(employee);
  }

  //   Delete
  async delete(id: number): Promise<Employee> {
    const employee = await this.employees.findOne(id);
    if (!employee) {
      throw new NotFoundException(DNEerr.employee);
    }
    return await this.employees.remove(employee);
  }
}
