"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export interface ApplicationResult {
  success: boolean;
  applicationId?: string;
  positionAppliedFor?: string;
  message?: string;
  error?: string;
}

/**
 * Handle worker job application submission with optional Resume/Bio-Data file
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

  // Handle Resume File Upload (PDF/Word, Max 5MB)
  let resumeFileUrl: string | null = null;
  let resumeFileName: string | null = null;

  const resumeFile = formData.get("resume") as File | null;
  if (resumeFile && resumeFile.size > 0 && typeof resumeFile.name === "string") {
    // 5MB Limit Validation
    if (resumeFile.size > 5 * 1024 * 1024) {
      return {
        success: false,
        error: "Resume file size exceeds the 5MB limit. Please upload a smaller file.",
      };
    }

    // Allowed Extensions Validation (.pdf, .doc, .docx)
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const ext = path.extname(resumeFile.name).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return {
        success: false,
        error: "Invalid resume format. Only PDF (.pdf) and Word documents (.doc, .docx) are accepted.",
      };
    }

    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
      await fs.mkdir(uploadDir, { recursive: true });

      const sanitizedOriginalName = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const uniqueFileName = `LT-Resume-${Date.now()}-${sanitizedOriginalName}`;
      const filePath = path.join(uploadDir, uniqueFileName);

      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);

      resumeFileUrl = `/uploads/resumes/${uniqueFileName}`;
      resumeFileName = resumeFile.name;
    } catch (uploadErr) {
      console.warn("Resume file storage error (will continue application):", uploadErr);
    }
  }

  try {
    const year = new Date().getFullYear();
    const count = await db.application.count();
    const applicationId = `LT-${year}-${String(count + 1).padStart(6, "0")}`;

    const newApp = await db.application.create({
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
        resumeFileUrl,
        resumeFileName,
        status: "new",
      },
    });

    if (resumeFileUrl && resumeFileName) {
      await db.applicationDocument.create({
        data: {
          applicationId: newApp.id,
          documentType: "resume",
          fileUrl: resumeFileUrl,
          fileName: resumeFileName,
        },
      });
    }

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
