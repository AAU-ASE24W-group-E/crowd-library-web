import type { Address } from '@/interfaces/address.ts'

export interface User {
  email: string;
  username: string;
  password: string;
  address?: Address | null;
  role: string;
}
