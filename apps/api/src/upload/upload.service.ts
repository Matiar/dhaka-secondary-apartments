import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor(private config: ConfigService) {
    this.bucket = config.get('S3_BUCKET') || 'alcove-residences';
    this.publicUrl = config.get('S3_PUBLIC_URL') || '';
    this.s3 = new S3Client({
      region: config.get('S3_REGION') || 'ap-southeast-1',
      endpoint: config.get('S3_ENDPOINT'),
      credentials: {
        accessKeyId: config.get('S3_ACCESS_KEY_ID') || '',
        secretAccessKey: config.get('S3_SECRET_ACCESS_KEY') || '',
      },
      forcePathStyle: true,
    });
  }

  async getPresignedUrl(filename: string, contentType: string) {
    const key = `uploads/${uuidv4()}-${filename}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
    const publicUrl = this.publicUrl ? `${this.publicUrl}/${key}` : uploadUrl.split('?')[0];

    return { uploadUrl, publicUrl, key };
  }
}
