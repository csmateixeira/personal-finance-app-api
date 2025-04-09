import { SetMetadata } from '@nestjs/common';

export const BUDGETS_REPOSITORY = 'BUDGETS_REPOSITORY';
export const TRANSACTIONS_REPOSITORY = 'TRANSACTIONS_REPOSITORY';
export const POTS_REPOSITORY = 'POTS_REPOSITORY';
export const DATA_SOURCE = 'DATA_SOURCE';
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
