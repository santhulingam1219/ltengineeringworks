"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface VacancyActionResult {
  success: boolean;
  error?: string;
}

export async function createVacancyAction(formData: FormData): Promise<void> {
  const title = (formData.get("title") as string)?.trim();
  const categoryId = (formData.get("categoryId") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || "Paradeep, Odisha";
  const openingsCount = parseInt(formData.get("openingsCount") as string) || 1;
  const experienceMinYears = parseInt(formData.get("experienceMinYears") as string) || 0;
  const experienceMaxYears = parseInt(formData.get("experienceMaxYears") as string) || null;
  const qualification = (formData.get("qualification") as string)?.trim();
  const employmentType = (formData.get("employmentType") as string)?.trim() || "Project Based";
  const salaryDisplay = (formData.get("salaryDisplay") as string)?.trim();
  const jobDescription = (formData.get("jobDescription") as string)?.trim();
  const responsibilities = (formData.get("responsibilities") as string)?.trim();
  const skillsInput = (formData.get("skillsRequired") as string)?.trim();
  const accommodationProvided = formData.get("accommodationProvided") === "on";
  const transportProvided = formData.get("transportProvided") === "on";
  const isFeatured = formData.get("isFeatured") === "on";

  if (!title || !categoryId || !jobDescription) {
    throw new Error("Please enter Job Title, Category, and Job Description.");
  }

  const skillsRequired = skillsInput
    ? JSON.stringify(skillsInput.split(",").map((s) => s.trim()))
    : null;

  try {
    const count = await db.vacancy.count();
    const year = new Date().getFullYear();
    const jobId = `LT-VAC-${year}-${String(count + 1).padStart(3, "0")}`;
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-paradeep-${count + 1}`;

    await db.vacancy.create({
      data: {
        jobId,
        slug,
        title,
        categoryId,
        location,
        openingsCount,
        experienceMinYears,
        experienceMaxYears,
        qualification: qualification || null,
        employmentType,
        salaryDisplay: salaryDisplay || null,
        jobDescription,
        responsibilities: responsibilities || null,
        skillsRequired,
        accommodationProvided,
        transportProvided,
        isFeatured,
        status: "published",
      },
    });

    revalidatePath("/careers");
    revalidatePath("/admin/vacancies");
  } catch (error) {
    console.error("Create vacancy error:", error);
    throw new Error("Failed to create vacancy. Please try again.");
  }

  redirect("/admin/vacancies");
}

export async function toggleVacancyStatusAction(vacancyId: string, newStatus: string) {
  try {
    await db.vacancy.update({
      where: { id: vacancyId },
      data: { status: newStatus },
    });
    revalidatePath("/careers");
    revalidatePath("/admin/vacancies");
    return { success: true };
  } catch (error) {
    console.error("Toggle vacancy status error:", error);
    return { success: false, error: "Failed to update vacancy status." };
  }
}

export async function updateVacancyAction(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const categoryId = (formData.get("categoryId") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || "Paradeep, Odisha";
  const openingsCount = parseInt(formData.get("openingsCount") as string) || 1;
  const experienceMinYears = parseInt(formData.get("experienceMinYears") as string) || 0;
  const qualification = (formData.get("qualification") as string)?.trim();
  const salaryDisplay = (formData.get("salaryDisplay") as string)?.trim();
  const jobDescription = (formData.get("jobDescription") as string)?.trim();
  const responsibilities = (formData.get("responsibilities") as string)?.trim();
  const status = (formData.get("status") as string)?.trim() || "published";
  const accommodationProvided = formData.get("accommodationProvided") === "on";
  const transportProvided = formData.get("transportProvided") === "on";
  const isFeatured = formData.get("isFeatured") === "on";

  if (!id || !title || !categoryId || !jobDescription) {
    throw new Error("Please fill in required fields.");
  }

  try {
    await db.vacancy.update({
      where: { id },
      data: {
        title,
        categoryId,
        location,
        openingsCount,
        experienceMinYears,
        qualification: qualification || null,
        salaryDisplay: salaryDisplay || null,
        jobDescription,
        responsibilities: responsibilities || null,
        status,
        accommodationProvided,
        transportProvided,
        isFeatured,
      },
    });

    revalidatePath("/careers");
    revalidatePath("/admin/vacancies");
  } catch (error) {
    console.error("Update vacancy error:", error);
    throw new Error("Failed to update vacancy.");
  }

  redirect("/admin/vacancies");
}

export async function deleteVacancyAction(id: string) {
  try {
    await db.vacancy.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/careers");
    revalidatePath("/admin/vacancies");
    return { success: true };
  } catch (error) {
    console.error("Delete vacancy error:", error);
    return { success: false, error: "Failed to archive vacancy." };
  }
}
