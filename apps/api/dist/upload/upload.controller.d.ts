import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    getPresignedUrl(body: {
        filename: string;
        contentType: string;
    }): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
}
