import { SessionPayload } from "./session";

/**
 * Check if the user has a specific permission code (e.g. 'projects:create').
 * Super Admin has automatic universal authorization.
 */
export function hasPermission(user: SessionPayload | null, permissionCode: string): boolean {
  if (!user) return false;
  if (user.roleName === "super_admin") return true;
  return user.permissions.includes(permissionCode);
}

/**
 * Guard function that throws or returns error response if permission is missing.
 */
export function requirePermission(user: SessionPayload | null, permissionCode: string): void {
  if (!hasPermission(user, permissionCode)) {
    throw new Error(`Unauthorized: Missing required permission '${permissionCode}'`);
  }
}
