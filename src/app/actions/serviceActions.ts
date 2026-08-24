"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateServiceAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim();
  const shortDescription = (formData.get("shortDescription") as string)?.trim();
  const fullDescription = (formData.get("fullDescription") as string)?.trim();
  const featuredImageUrl = (formData.get("featuredImageUrl") as string)?.trim() || null;

  if (!id || !shortDescription || !fullDescription) {
    return { success: false, error: "Please provide Short Description and Full Description." };
  }

  try {
    const updated = await db.service.update({
      where: { id },
      data: {
        shortDescription,
        fullDescription,
        featuredImageUrl,
      },
    });

    await db.activityLog.create({
      data: {
        action: "UPDATE_SERVICE",
        module: "services",
        recordId: id,
        metadata: JSON.stringify({ name: updated.name, featuredImageUrl }),
      },
    });

    revalidatePath("/services");
    revalidatePath(`/services/${updated.slug}`);
    revalidatePath("/admin/services");

    return { success: true, service: updated };
  } catch (error: any) {
    console.error("Update service error:", error);
    return { success: false, error: error?.message || "Failed to update service." };
  }
}
