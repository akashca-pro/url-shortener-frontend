import { apiClient } from '@/lib/http';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;
export type SignupCredentials = z.infer<typeof SignupSchema>;

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
      accessToken: string;
      user: {
        id: string;
        name: string;
        email: string;
      };
  };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  return apiClient<AuthResponse>('/auth/login', {
    data: credentials,
  });
};

export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  return apiClient<AuthResponse>('/auth/signup', {
    data: credentials,
  });
};

export const logout = async (): Promise<{ success: boolean; message: string }> => {
  return apiClient<{ success: boolean; message: string }>('/auth/logout', {
    method: 'DELETE',
  });
};
