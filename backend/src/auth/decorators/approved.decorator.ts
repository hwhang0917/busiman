import { SetMetadata } from '@nestjs/common';
import { APPROVED_CTX } from 'src/common/common.constant';

export const Approved = () => SetMetadata(APPROVED_CTX, true);
