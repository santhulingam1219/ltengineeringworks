"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface EnquirySubmissionResult {
  success: boolean;
  enquiryId?: string;
  message?: string;
  error?: string;
}

/**
 * Handle submission of Client Project Enquiry with BOQ
 */
export async function submitProjectEnquiryAction(
  prevState: unknown,
  formData: FormData
): Promise<EnquirySubmissionResult> {
  const companyName = (formData.get("companyName") as string)?.trim();
  const contactPerson = (formData.get("contactPerson") as string)?.trim();
  const designation = (formData.get("designation") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const projectLocation = (formData.get("projectLocation") as string)?.trim();
  const projectType = (formData.get("projectType") as string)?.trim();
  const requiredService = (formData.get("requiredService") as string)?.trim();
  const estimatedWorkforce = (formData.get("estimatedWorkforce") as string)?.trim();
  const expectedDuration = (formData.get("expectedDuration") as string)?.trim();
  const projectDescription = (formData.get("projectDescription") as string)?.trim();

  if (!companyName || !contactPerson || !phone || !projectDescription) {
    return { success: false, error: "Please fill in all required fields (marked with *)." };
  }

  try {
    const year = new Date().getFullYear();
    const count = await db.projectEnquiry.count();
    const enquiryId = `LT-PE-${year}-${String(count + 1).padStart(4, "0")}`;

    await db.projectEnquiry.create({
      data: {
        enquiryId,
        companyName,
        contactPerson,
        designation: designation || null,
        phone,
        email: email || null,
        projectLocation: projectLocation || null,
        projectType: projectType || null,
        requiredService: requiredService || null,
        estimatedWorkforce: estimatedWorkforce || null,
        expectedDuration: expectedDuration || null,
        projectDescription,
        status: "new",
        priority: "normal",
      },
    });

    revalidatePath("/admin/enquiries");
    return {
      success: true,
      enquiryId,
      message: "Your project enquiry has been submitted successfully.",
    };
  } catch (error) {
    console.error("Project enquiry submission error:", error);
    return { success: false, error: "Unable to submit project enquiry. Please try again or call our hotline." };
  }
}

/**
 * Handle submission of B2B Manpower Requisition
 */
export async function submitManpowerEnquiryAction(
  prevState: unknown,
  formData: FormData
): Promise<EnquirySubmissionResult> {
  const companyName = (formData.get("companyName") as string)?.trim();
  const contactPerson = (formData.get("contactPerson") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const requiredPositions = (formData.get("requiredPositions") as string)?.trim();
  const totalWorkersNeeded = parseInt(formData.get("totalWorkersNeeded") as string) || null;
  const duration = (formData.get("duration") as string)?.trim();
  const additionalRequirements = (formData.get("additionalRequirements") as string)?.trim();

  if (!companyName || !contactPerson || !phone || !requiredPositions) {
    return { success: false, error: "Please provide Company Name, Contact Person, Phone, and Required Trades." };
  }

  try {
    const year = new Date().getFullYear();
    const count = await db.manpowerEnquiry.count();
    const enquiryId = `LT-ME-${year}-${String(count + 1).padStart(4, "0")}`;

    await db.manpowerEnquiry.create({
      data: {
        enquiryId,
        companyName,
        contactPerson,
        phone,
        email: email || null,
        location: location || null,
        requiredPositions,
        totalWorkersNeeded,
        duration: duration || null,
        additionalRequirements: additionalRequirements || null,
        status: "new",
      },
    });

    revalidatePath("/admin/enquiries");
    return {
      success: true,
      enquiryId,
      message: "Manpower requisition received. Our mobilization team will contact you shortly.",
    };
  } catch (error) {
    console.error("Manpower requisition submission error:", error);
    return { success: false, error: "Unable to submit manpower requisition. Please try again." };
  }
}

/**
 * Handle General Contact Enquiries
 */
export async function submitContactEnquiryAction(
  prevState: unknown,
  formData: FormData
): Promise<EnquirySubmissionResult> {
  const name = (formData.get("name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim();
  const category = (formData.get("category") as string)?.trim() || "general";
  const message = (formData.get("message") as string)?.trim();

  if (!name || !phone || !message) {
    return { success: false, error: "Please enter your Name, Phone Number, and Message." };
  }

  try {
    await db.contactEnquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        company: company || null,
        subject: subject || null,
        category,
        message,
        status: "new",
      },
    });

    revalidatePath("/admin/enquiries");
    return {
      success: true,
      message: "Thank you for contacting LT Engineering Works. We have received your inquiry.",
    };
  } catch (error) {
    console.error("Contact enquiry submission error:", error);
    return { success: false, error: "Unable to send message. Please try again." };
  }
}

/**
 * Admin action to update Enquiry status (project/manpower) and add internal quote notes
 */
export async function updateEnquiryStatusAction(
  enquiryId: string,
  type: "project" | "manpower" | "contact",
  newStatus: string,
  internalNote?: string
) {
  try {
    if (type === "project") {
      await db.projectEnquiry.update({
        where: { id: enquiryId },
        data: { status: newStatus },
      });
    } else if (type === "manpower") {
      await db.manpowerEnquiry.update({
        where: { id: enquiryId },
        data: { status: newStatus },
      });
    } else {
      await db.contactEnquiry.update({
        where: { id: enquiryId },
        data: { status: newStatus },
      });
    }

    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Update enquiry status error:", error);
    return { success: false, error: "Failed to update status." };
  }
}
