import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private config;
    private s3;
    private bucket;
    private publicUrl;
    constructor(config: ConfigService);
    getPresignedUrl(filename: string, contentType: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
}
