import { usersAPI } from '../utils/api';

export const userService = {
  getUsers: (params) => usersAPI.getUsers(params),
  createUser: (payload) => usersAPI.createUser(payload),
  updateUser: (id, payload) => usersAPI.updateUser(id, payload),
  deleteUser: (id) => usersAPI.deleteUser(id)
};

export default userService;
