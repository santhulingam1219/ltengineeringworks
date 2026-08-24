"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonialAction(formData: FormData): Promise<void> {
  const clientName = (formData.get("clientName") as string)?.trim();
  const designation = (formData.get("designation") as string)?.trim();
  const companyName = (formData.get("companyName") as string)?.trim();
  const testimonialText = (formData.get("testimonialText") as string)?.trim();
  const rating = parseInt(formData.get("rating") as string) || 5;
  const isFeatured = formData.get("isFeatured") === "on";

  if (!clientName || !companyName || !testimonialText) {
    throw new Error("Please provide Client Name, Company Name, and Testimonial text.");
  }

  try {
    await db.testimonial.create({
      data: {
        clientName,
        designation: designation || null,
        companyName,
        testimonialText,
        rating,
        isFeatured,
        isPublished: true,
      },
    });

    revalidatePath("/about");
    revalidatePath("/admin/testimonials");
  } catch (error) {
    console.error("Create testimonial error:", error);
    throw new Error("Failed to save testimonial.");
  }

  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string) {
  try {
    await db.testimonial.delete({ where: { id } });
    revalidatePath("/about");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error: any) {
    console.error("Delete testimonial error:", error);
    return { success: false, error: error?.message || "Failed to delete testimonial." };
  }
}

export async function toggleTestimonialFeaturedAction(id: string) {
  try {
    const item = await db.testimonial.findUnique({ where: { id } });
    if (!item) return { success: false, error: "Testimonial not found." };

    const updated = await db.testimonial.update({
      where: { id },
      data: { isFeatured: !item.isFeatured },
    });

    revalidatePath("/about");
    revalidatePath("/admin/testimonials");
    return { success: true, isFeatured: updated.isFeatured };
  } catch (error: any) {
    console.error("Toggle testimonial error:", error);
    return { success: false, error: error?.message || "Failed to update status." };
  }
}
