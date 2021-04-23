import * as jwt from 'jsonwebtoken';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { JwtModuleOptions } from './jwt.interfaces';
import { InvalidErr } from 'src/errors/message.error';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: Record<'id', number>): string {
    return jwt.sign(payload, this.options.privateKey);
  }
  verify(token: string) {
    try {
      return jwt.verify(token, this.options.privateKey);
    } catch (error) {
      throw new BadRequestException(InvalidErr.token);
    }
  }
}
