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
  const coverImageUrl = (formData.get("coverImageUrl") as string)?.trim() || null;
  const galleryImagesRaw = (formData.get("galleryImages") as string)?.trim();
  const isFeatured = formData.get("isFeatured") === "on";

  if (!name || !categoryId || !description) {
    throw new Error("Please provide Project Name, Category, and Description.");
  }

  try {
    const project = await db.project.create({
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
        coverImageUrl,
        isFeatured,
        isPublished: true,
      },
    });

    // Create cover image record if provided
    if (coverImageUrl) {
      const media = await db.mediaLibrary.findUnique({
        where: { storagePath: coverImageUrl },
      });

      await db.projectImage.create({
        data: {
          projectId: project.id,
          mediaId: media?.id || null,
          imageUrl: coverImageUrl,
          caption: `${name} Cover Photo`,
          altText: name,
          isCover: true,
          displayOrder: 0,
        },
      });
    }

    // Process gallery images if provided
    if (galleryImagesRaw) {
      const urls = galleryImagesRaw.split(",").map(u => u.trim()).filter(Boolean);
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        if (url !== coverImageUrl) {
          const media = await db.mediaLibrary.findUnique({ where: { storagePath: url } });
          await db.projectImage.create({
            data: {
              projectId: project.id,
              mediaId: media?.id || null,
              imageUrl: url,
              caption: `${name} Gallery Photo #${i + 1}`,
              altText: name,
              isCover: false,
              displayOrder: i + 1,
            },
          });
        }
      }
    }

    // Audit log
    await db.activityLog.create({
      data: {
        action: "CREATE_PROJECT",
        module: "projects",
        recordId: project.id,
        metadata: JSON.stringify({ name, slug, categoryId, coverImageUrl }),
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
  const coverImageUrl = (formData.get("coverImageUrl") as string)?.trim() || null;
  const galleryImagesRaw = (formData.get("galleryImages") as string)?.trim();
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
        coverImageUrl,
        isFeatured,
      },
    });

    // Update cover image if changed
    if (coverImageUrl) {
      const existingCover = await db.projectImage.findFirst({
        where: { projectId: id, isCover: true },
      });

      const media = await db.mediaLibrary.findUnique({
        where: { storagePath: coverImageUrl },
      });

      if (existingCover) {
        await db.projectImage.update({
          where: { id: existingCover.id },
          data: {
            imageUrl: coverImageUrl,
            mediaId: media?.id || null,
          },
        });
      } else {
        await db.projectImage.create({
          data: {
            projectId: id,
            mediaId: media?.id || null,
            imageUrl: coverImageUrl,
            caption: `${name} Cover Photo`,
            altText: name,
            isCover: true,
            displayOrder: 0,
          },
        });
      }
    }

    // Process gallery images if provided
    if (galleryImagesRaw) {
      const urls = galleryImagesRaw.split(",").map(u => u.trim()).filter(Boolean);
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const exists = await db.projectImage.findFirst({
          where: { projectId: id, imageUrl: url },
        });
        if (!exists) {
          const media = await db.mediaLibrary.findUnique({ where: { storagePath: url } });
          await db.projectImage.create({
            data: {
              projectId: id,
              mediaId: media?.id || null,
              imageUrl: url,
              caption: `${name} Gallery Photo`,
              altText: name,
              isCover: false,
              displayOrder: i + 1,
            },
          });
        }
      }
    }

    // Audit log
    await db.activityLog.create({
      data: {
        action: "UPDATE_PROJECT",
        module: "projects",
        recordId: id,
        metadata: JSON.stringify({ name, categoryId, coverImageUrl }),
      },
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/admin/projects");
  } catch (error) {
    console.error("Update project error:", error);
    throw new Error("Unable to update project.");
  }

  redirect("/admin/projects");
}

export async function toggleFeaturedProjectAction(id: string, isFeatured: boolean) {
  try {
    await db.project.update({
      where: { id },
      data: { isFeatured },
    });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Toggle featured project error:", error);
    return { success: false, error: "Failed to update featured status." };
  }
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
