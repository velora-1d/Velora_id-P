import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const endpoint = process.env.SUPABASE_S3_ENDPOINT;
const bucket = process.env.SUPABASE_STORAGE_BUCKET;

const storageClient = new S3Client({
    region: 'auto',
    endpoint,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
    },
});

function publicUrlFor(key) {
    const configured = process.env.SUPABASE_STORAGE_PUBLIC_URL?.replace(/\/$/, '');
    if (configured) return `${configured}/${key}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
    if (!supabaseUrl || !bucket) throw new Error('SUPABASE_STORAGE_PUBLIC_URL belum dikonfigurasi');

    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${key}`;
}

export async function uploadToStorage(file, fileName, contentType) {
    if (!endpoint || !bucket) throw new Error('Konfigurasi Supabase Storage belum lengkap');

    await storageClient.send(new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ContentType: contentType,
    }));

    return publicUrlFor(fileName);
}

export async function deleteFromStorage(fileName) {
    if (!bucket) throw new Error('SUPABASE_STORAGE_BUCKET belum dikonfigurasi');

    await storageClient.send(new DeleteObjectCommand({
        Bucket: bucket,
        Key: fileName,
    }));
}
