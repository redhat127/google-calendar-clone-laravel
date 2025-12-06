export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  provider_name: string;
  avatar: string | null;
};

export type Event = {
  id: string;
  name: string;
  description: string | null;
  duration_in_minutes: number;
  is_active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type FlashMessage = {
  type: 'error' | 'success';
  text: string;
} | null;

export type Auth = { data: User } | null;
