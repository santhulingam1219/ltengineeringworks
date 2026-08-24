"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export interface MediaUploadResult {
  success: boolean;
  url?: string;
  id?: string;
  fileName?: string;
  error?: string;
}

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "media");

function ensureUploadDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function uploadMediaImageAction(formData: FormData): Promise<MediaUploadResult> {
  try {
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string)?.trim() || "general";
    const altText = (formData.get("altText") as string)?.trim() || "LT Engineering Works Asset";
    const caption = (formData.get("caption") as string)?.trim() || "";

    if (!file || file.size === 0) {
      return { success: false, error: "No image file provided." };
    }

    // 20MB upper limit
    if (file.size > 20 * 1024 * 1024) {
      return { success: false, error: "Image exceeds maximum allowed size (20MB)." };
    }

    ensureUploadDir();

    // Read bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize base name
    const rawName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "_").toLowerCase();
    const timestamp = Date.now();
    const targetFileName = `${rawName}_${timestamp}.webp`;
    const targetFilePath = path.join(UPLOADS_DIR, targetFileName);
    const storagePath = `/uploads/media/${targetFileName}`;

    // Auto-convert to WebP and constrain to max 1600px
    const converted = await sharp(buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(targetFilePath);

    const stat = fs.statSync(targetFilePath);
    const dimensions = `${converted.width || 1400}x${converted.height || 788}`;

    // Index in Supabase MediaLibrary
    const mediaRecord = await db.mediaLibrary.create({
      data: {
        fileName: targetFileName,
        storagePath,
        fileType: "image",
        mimeType: "image/webp",
        fileSizeBytes: stat.size,
        dimensions,
        altText,
        caption,
        category,
        isSecure: false,
      },
    });

    // Immutable activity log
    await db.activityLog.create({
      data: {
        action: "UPLOAD_MEDIA",
        module: "media",
        recordId: mediaRecord.id,
        metadata: JSON.stringify({ fileName: targetFileName, category, size: stat.size, dimensions }),
      },
    });

    revalidatePath("/admin/media");
    revalidatePath("/admin/projects");
    return {
      success: true,
      url: storagePath,
      id: mediaRecord.id,
      fileName: targetFileName,
    };
  } catch (error: any) {
    console.error("Media upload error:", error);
    return { success: false, error: error?.message || "Failed to process and convert image." };
  }
}

export async function deleteMediaImageAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const media = await db.mediaLibrary.findUnique({ where: { id } });
    if (!media) {
      return { success: false, error: "Media record not found." };
    }

    // Delete record from Supabase
    await db.mediaLibrary.delete({ where: { id } });

    // If it's a file in /public/uploads/media/, safely unlink it
    if (media.storagePath.startsWith("/uploads/media/")) {
      const fullPath = path.join(process.cwd(), "public", media.storagePath);
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (e) {
          console.warn("Could not remove file from disk:", fullPath);
        }
      }
    }

    // Log deletion
    await db.activityLog.create({
      data: {
        action: "DELETE_MEDIA",
        module: "media",
        recordId: id,
        metadata: JSON.stringify({ fileName: media.fileName, path: media.storagePath }),
      },
    });

    revalidatePath("/admin/media");
    return { success: true };
  } catch (error: any) {
    console.error("Delete media error:", error);
    return { success: false, error: error?.message || "Failed to delete media asset." };
  }
}

export async function getMediaLibraryAction(category?: string) {
  const where: any = {};
  if (category && category !== "all") {
    where.category = category;
  }
  return await db.mediaLibrary.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}
