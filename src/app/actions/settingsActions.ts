"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSiteSettingsAction(formData: FormData): Promise<void> {
  const entries = Array.from(formData.entries());

  for (const [key, value] of entries) {
    if (typeof value === "string" && !key.startsWith("$")) {
      await db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}
