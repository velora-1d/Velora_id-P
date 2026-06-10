import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

/**
 * Cloudflare R2 Client (S3 Compatible)
 * 
 * Credentials and configuration are pulled from environment variables
 * for security. Do NOT hardcode secrets here.
 */
const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});

/**
 * Uploads a file to Cloudflare R2
 * @param {Buffer | Blob | string} file - The file content
 * @param {string} fileName - Destination filename (including path/folders)
 * @param {string} contentType - Mime type (e.g., 'image/webp')
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export async function uploadToR2(file, fileName, contentType) {
    if (!process.env.R2_BUCKET_NAME) {
        throw new Error("R2_BUCKET_NAME is not configured");
    }

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: contentType,
    });

    try {
        await r2Client.send(command);
        
        // Remove trailing slash from public URL if exists
        const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
        return `${publicUrl}/${fileName}`;
    } catch (error) {
        console.error("R2 Upload Error:", error);
        throw error;
    }
}

/**
 * Deletes a file from Cloudflare R2
 * @param {string} fileName - The filename/key to delete
 */
export async function deleteFromR2(fileName) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
    });

    try {
        await r2Client.send(command);
    } catch (error) {
        console.error("R2 Delete Error:", error);
        throw error;
    }
}
