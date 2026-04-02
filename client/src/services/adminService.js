import { adminAPI } from '../utils/api';

export const adminService = {
  updateProfile: (payload) => adminAPI.updateProfile(payload),
  updatePassword: (payload) => adminAPI.updatePassword(payload)
};

export default adminService;
