import { api } from '@/libs/http/axios';
import {
  CreateEditUserFormData,
} from '@/modules/edit-user/schemas/create-edit-user-form-schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import { getValidToken } from '@/global/utils/auth';

export async function createUser(data: CreateUserDTO) {
  const response = await api.post('/users', data);
  return response.data;
}

export async function updateUser(userId: string, data: FormData) {
  const token = getValidToken();
  const response = await api.patch(`/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
