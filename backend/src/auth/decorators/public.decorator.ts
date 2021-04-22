import { SetMetadata } from '@nestjs/common';
import { PUBLIC_CTX } from 'src/common/common.constant';

export const Public = () => SetMetadata(PUBLIC_CTX, true);
