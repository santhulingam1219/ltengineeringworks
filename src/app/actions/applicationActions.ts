"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface ApplicationResult {
  success: boolean;
  applicationId?: string;
  positionAppliedFor?: string;
  message?: string;
  error?: string;
}

/**
 * Handle worker job application submission
 */
export async function submitWorkerApplicationAction(
  prevState: unknown,
  formData: FormData
): Promise<ApplicationResult> {
  const vacancyId = (formData.get("vacancyId") as string)?.trim() || null;
  const positionAppliedFor = (formData.get("positionAppliedFor") as string)?.trim();
  const fullName = (formData.get("fullName") as string)?.trim();
  const mobileNumber = (formData.get("mobileNumber") as string)?.trim();
  const altMobileNumber = (formData.get("altMobileNumber") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const currentLocation = (formData.get("currentLocation") as string)?.trim() || null;
  const preferredLocation = (formData.get("preferredLocation") as string)?.trim() || null;
  const yearsOfExperience = (formData.get("yearsOfExperience") as string)?.trim() || null;
  const qualification = (formData.get("qualification") as string)?.trim() || null;
  const skills = (formData.get("skills") as string)?.trim() || null;
  const previousCompany = (formData.get("previousCompany") as string)?.trim() || null;
  const joiningAvailability = (formData.get("joiningAvailability") as string)?.trim() || null;
  const additionalInfo = (formData.get("additionalInfo") as string)?.trim() || null;

  if (!fullName || !mobileNumber || !positionAppliedFor) {
    return {
      success: false,
      error: "Please provide Full Name, Mobile Number, and Position Applied For.",
    };
  }

  // Validate mobile number format
  if (!/^\+?[0-9]{10,13}$/.test(mobileNumber.replace(/[\s-]/g, ""))) {
    return {
      success: false,
      error: "Please enter a valid 10-digit mobile number.",
    };
  }

  try {
    const year = new Date().getFullYear();
    const count = await db.application.count();
    const applicationId = `LT-${year}-${String(count + 1).padStart(6, "0")}`;

    await db.application.create({
      data: {
        applicationId,
        vacancyId,
        fullName,
        mobileNumber,
        altMobileNumber,
        email,
        currentLocation,
        preferredLocation,
        positionAppliedFor,
        yearsOfExperience,
        qualification,
        skills,
        previousCompany,
        joiningAvailability,
        additionalInfo,
        status: "new",
      },
    });

    revalidatePath("/admin/applications");

    return {
      success: true,
      applicationId,
      positionAppliedFor,
      message: "Application submitted successfully.",
    };
  } catch (error) {
    console.error("Worker application error:", error);
    return {
      success: false,
      error: "Unable to submit application at this time. Please call our recruitment team directly.",
    };
  }
}

/**
 * Admin action to update application status and add internal note
 */
export async function updateApplicationStatusAction(
  applicationId: string,
  newStatus: string,
  adminUserId?: string,
  internalNote?: string
) {
  try {
    const app = await db.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
    });

    if (internalNote && adminUserId) {
      await db.applicationNote.create({
        data: {
          applicationId,
          userId: adminUserId,
          noteText: internalNote,
        },
      });
    }

    revalidatePath("/admin/applications");
    return { success: true };
  } catch (error) {
    console.error("Error updating application status:", error);
    return { success: false, error: "Failed to update application status." };
  }
}
