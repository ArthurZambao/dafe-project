import { api } from '@/libs/http/axios';
import {
  CreateEditUserFormData,
} from '@/modules/edit-user/schemas/create-edit-user-form-schema';
import { CreateUserDTO } from './dtos/create-user.dto';

export async function createUser(data: CreateUserDTO) {
  const response = await api.post('/users', data);
  return response.data;
}

export async function updateUser(userId: string, data: CreateEditUserFormData) {
  const response = await api.patch(`/users/${userId}`, data);
  return response.data;
}
