"use server";

import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { encryptSession, setSessionCookie, clearSessionCookie } from "@/lib/session";
import { redirect } from "next/navigation";

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginAdminAction(prevState: unknown, formData: FormData): Promise<LoginResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please provide both email and password." };
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.isActive || user.deletedAt) {
      return { success: false, error: "Invalid credentials or deactivated account." };
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password." };
    }

    // Extract user permissions
    const permissions = user.role.permissions.map((rp) => rp.permission.code);

    // Create and set encrypted session
    const token = await encryptSession({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      roleName: user.role.name,
      permissions,
    });

    await setSessionCookie(token);

    // Update last login timestamp & log activity
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await db.activityLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "LOGIN",
        module: "auth",
        recordId: user.id,
        metadata: JSON.stringify({ ip: "internal", status: "success" }),
      },
    });

  } catch (error) {
    console.error("Login action error:", error);
    return { success: false, error: "An unexpected error occurred during login. Please try again." };
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function changePasswordAction(prevState: unknown, formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const userId = formData.get("userId") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: "Please provide all password fields." };
  }

  if (newPassword.length < 8) {
    return { success: false, error: "New password must be at least 8 characters long." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: "New passwords do not match." };
  }

  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { success: false, error: "User account not found." };
    }

    const isMatch = await verifyPassword(currentPassword, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: "Current password is incorrect." };
    }

    const { hashPassword } = await import("@/lib/auth");
    const newHash = await hashPassword(newPassword);

    await db.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    await db.activityLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "PASSWORD_CHANGE",
        module: "users",
        recordId: user.id,
      },
    });

    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    console.error("Change password error:", error);
    return { success: false, error: "Failed to update password." };
  }
}
