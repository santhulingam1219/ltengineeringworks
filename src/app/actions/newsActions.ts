"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewsPostAction(formData: FormData): Promise<void> {
  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const category = (formData.get("category") as string)?.trim() || "Company Update";
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const featuredImageUrl = (formData.get("featuredImageUrl") as string)?.trim() || null;
  const status = (formData.get("status") as string)?.trim() || "published";

  if (!title || !content) {
    throw new Error("Please provide Title and Content for the news post.");
  }

  try {
    await db.newsPost.create({
      data: {
        title,
        slug,
        category,
        excerpt: excerpt || null,
        content,
        featuredImageUrl,
        status,
        publishedAt: new Date(),
      },
    });

    revalidatePath("/news");
    revalidatePath("/admin/news");
  } catch (error) {
    console.error("Create news post error:", error);
    throw new Error("Failed to create news post.");
  }

  redirect("/admin/news");
}

export async function toggleNewsStatusAction(id: string, newStatus: string) {
  try {
    await db.newsPost.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("Toggle news status error:", error);
    return { success: false, error: "Failed to update news status." };
  }
}

export async function deleteNewsPostAction(id: string) {
  try {
    await db.newsPost.delete({ where: { id } });
    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("Delete news error:", error);
    return { success: false, error: "Failed to delete post." };
  }
}
