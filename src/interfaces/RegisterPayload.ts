export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  address?: string | null;
  role: string;
}
