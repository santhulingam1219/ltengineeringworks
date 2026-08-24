"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface ProjectActionResult {
  success: boolean;
  error?: string;
}

export async function createProjectAction(formData: FormData): Promise<void> {
  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const categoryId = (formData.get("categoryId") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || "Paradeep, Odisha";
  const industry = (formData.get("industry") as string)?.trim();
  const status = (formData.get("status") as string)?.trim() || "completed";
  const description = (formData.get("description") as string)?.trim();
  const scopeOfWork = (formData.get("scopeOfWork") as string)?.trim();
  const manpowerDeployed = (formData.get("manpowerDeployed") as string)?.trim();
  const duration = (formData.get("duration") as string)?.trim();
  const isFeatured = formData.get("isFeatured") === "on";

  if (!name || !categoryId || !description) {
    throw new Error("Please provide Project Name, Category, and Description.");
  }

  try {
    await db.project.create({
      data: {
        name,
        slug,
        categoryId,
        location,
        industry: industry || null,
        status,
        description,
        scopeOfWork: scopeOfWork || null,
        manpowerDeployed: manpowerDeployed || null,
        duration: duration || null,
        isFeatured,
        isPublished: true,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  } catch (error) {
    console.error("Create project error:", error);
    throw new Error("Unable to create project. Check if slug already exists.");
  }

  redirect("/admin/projects");
}

export async function updateProjectAction(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const categoryId = (formData.get("categoryId") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || "Paradeep, Odisha";
  const industry = (formData.get("industry") as string)?.trim();
  const status = (formData.get("status") as string)?.trim() || "completed";
  const description = (formData.get("description") as string)?.trim();
  const scopeOfWork = (formData.get("scopeOfWork") as string)?.trim();
  const manpowerDeployed = (formData.get("manpowerDeployed") as string)?.trim();
  const duration = (formData.get("duration") as string)?.trim();
  const isFeatured = formData.get("isFeatured") === "on";

  if (!id || !name || !categoryId || !description) {
    throw new Error("Please provide Project ID, Name, Category, and Description.");
  }

  try {
    await db.project.update({
      where: { id },
      data: {
        name,
        categoryId,
        location,
        industry: industry || null,
        status,
        description,
        scopeOfWork: scopeOfWork || null,
        manpowerDeployed: manpowerDeployed || null,
        duration: duration || null,
        isFeatured,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  } catch (error) {
    console.error("Update project error:", error);
    throw new Error("Unable to update project.");
  }

  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  try {
    await db.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Delete project error:", error);
    return { success: false, error: "Failed to archive project." };
  }
}
