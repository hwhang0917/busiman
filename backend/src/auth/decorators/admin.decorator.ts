import { SetMetadata } from '@nestjs/common';
import { ADMIN_CTX } from 'src/common/common.constant';

export const Admin = () => SetMetadata(ADMIN_CTX, true);
