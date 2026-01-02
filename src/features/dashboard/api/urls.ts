import { apiClient } from '@/lib/http';
import { z } from 'zod';

export const CreateUrlSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  customCode: z.string().optional(),
});

export type CreateUrlInput = z.infer<typeof CreateUrlSchema>;

export interface UrlItem {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
}

export interface UrlsResponse {
    success: boolean;
    message: string;
    data: {
        urls: UrlItem[];
        total: number;
    }
}

export interface CreateUrlResponse {
    success: boolean;
    message: string;
    data: UrlItem;
}

export const createShortUrl = async (data: CreateUrlInput): Promise<CreateUrlResponse> => {
  return apiClient<CreateUrlResponse>('/urls/shorten', {
    data,
  });
};

export const getMyUrls = async (): Promise<UrlsResponse> => {
  return apiClient<UrlsResponse>('/urls');
};

export const deleteUrl = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiClient<{ success: boolean; message: string }>(`/urls/${id}`, {
    method: 'DELETE',
  });
};
