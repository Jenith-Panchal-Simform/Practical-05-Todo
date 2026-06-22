import { axiosInstance } from "./axios";

export const GET = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

export const POST = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data);
  return response.data;
};

export const PUT = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data);
  return response.data;
};

export const PATCH = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await axiosInstance.patch<T>(url, data);
  return response.data;
};

export const DELETE = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete<T>(url);
  return response.data;
};
