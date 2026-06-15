import { UserRole } from "../../features/scorer-console/pages/type.js";

export const checkPermissions = (userRole, allowedRoles) => {
  if (userRole === UserRole.SUPER_ADMIN) return true;
  return allowedRoles.includes(userRole);
};
