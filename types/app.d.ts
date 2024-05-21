type ConnectionStatus = {
  isConnected: boolean;
};

type Role = 'Admin' | 'Moderator' | 'Viewer';

type Auth0User = {
  created_at: string;
  picture: string;
  email_verified: boolean;
  email: string;
  name: string;
  updated_at: string;
  last_password_reset: string;
  identities: Array<Record<string, string>>;
  user_id: string;
  nickname: string;
  last_login: string;
  last_ip: string;
  logins_count: number;
  role: Role;
};
