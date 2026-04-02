import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

export const updateAdminProfileService = async (userId, payload) => {
  const admin = await User.findByIdAndUpdate(
    userId,
    {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      profession: payload.profession,
      isProfessional: payload.isProfessional
    },
    { new: true, runValidators: true }
  );

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  return admin;
};

export const updateAdminPasswordService = async (userId, currentPassword, newPassword) => {
  const admin = await User.findById(userId).select('+password');
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  const isMatch = await admin.matchPassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  admin.password = newPassword;
  await admin.save();

  return true;
};
