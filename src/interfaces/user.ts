import type { Address } from '@/interfaces/address.ts'

export interface User {
  id: string
  email: string;
  username: string;
  password: string;
  address?: Address | null;
  initialLoginPending: boolean;
  role: string;
}
