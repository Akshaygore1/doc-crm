export type User = {
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  role_id: string;
  created_at: Date;
  last_login: Date;
  is_active: boolean;
};
