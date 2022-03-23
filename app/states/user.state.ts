import { createState } from '@hookstate/core';
import { UserType } from '@/utils/types';
import { getUserFromCookie } from '@/utils/cookie';

export const userStore = createState<UserType | null>(getUserFromCookie);
