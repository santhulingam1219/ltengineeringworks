"use server";

import { db } from "@/lib/db";

export interface ApplicationTrackingResult {
  found: boolean;
  application?: {
    applicationId: string;
    fullName: string;
    positionAppliedFor: string;
    status: string;
    createdAt: Date;
    currentLocation: string | null;
    joiningAvailability: string | null;
  };
  error?: string;
}

export async function trackApplicationAction(
  prevState: unknown,
  formData: FormData
): Promise<ApplicationTrackingResult> {
  const query = (formData.get("query") as string)?.trim();

  if (!query) {
    return { found: false, error: "Please enter your Application ID or registered Mobile Number." };
  }

  try {
    const application = await db.application.findFirst({
      where: {
        OR: [
          { applicationId: query.toUpperCase() },
          { mobileNumber: query },
          { altMobileNumber: query },
        ],
        deletedAt: null,
      },
      select: {
        applicationId: true,
        fullName: true,
        positionAppliedFor: true,
        status: true,
        createdAt: true,
        currentLocation: true,
        joiningAvailability: true,
      },
    });

    if (!application) {
      return {
        found: false,
        error: "No application found matching the provided ID or Mobile number.",
      };
    }

    return {
      found: true,
      application,
    };
  } catch (error) {
    console.error("Track application error:", error);
    return { found: false, error: "Unable to look up application at this moment." };
  }
}

export interface EnquiryTrackingResult {
  found: boolean;
  enquiryType?: "project" | "manpower";
  enquiry?: {
    enquiryId: string;
    companyName: string;
    contactPerson: string;
    status: string;
    createdAt: Date;
    scopeOrTrade?: string;
  };
  error?: string;
}

export async function trackEnquiryAction(
  prevState: unknown,
  formData: FormData
): Promise<EnquiryTrackingResult> {
  const query = (formData.get("query") as string)?.trim();

  if (!query) {
    return { found: false, error: "Please enter your Enquiry ID or registered Phone Number." };
  }

  try {
    // Check project enquiries
    const pe = await db.projectEnquiry.findFirst({
      where: {
        OR: [
          { enquiryId: query.toUpperCase() },
          { phone: query },
        ],
        deletedAt: null,
      },
    });

    if (pe) {
      return {
        found: true,
        enquiryType: "project",
        enquiry: {
          enquiryId: pe.enquiryId,
          companyName: pe.companyName,
          contactPerson: pe.contactPerson,
          status: pe.status,
          createdAt: pe.createdAt,
          scopeOrTrade: pe.requiredService || "General Project Scope",
        },
      };
    }

    // Check manpower enquiries
    const me = await db.manpowerEnquiry.findFirst({
      where: {
        OR: [
          { enquiryId: query.toUpperCase() },
          { phone: query },
        ],
        deletedAt: null,
      },
    });

    if (me) {
      return {
        found: true,
        enquiryType: "manpower",
        enquiry: {
          enquiryId: me.enquiryId,
          companyName: me.companyName,
          contactPerson: me.contactPerson,
          status: me.status,
          createdAt: me.createdAt,
          scopeOrTrade: me.requiredPositions,
        },
      };
    }

    return {
      found: false,
      error: "No project lead or manpower requisition found matching the provided reference.",
    };
  } catch (error) {
    console.error("Track enquiry error:", error);
    return { found: false, error: "Unable to retrieve enquiry status at this time." };
  }
}
