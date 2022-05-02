import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from './medataKeys.decorators.constants';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
