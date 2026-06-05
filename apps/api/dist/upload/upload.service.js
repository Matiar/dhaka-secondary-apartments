"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
let UploadService = class UploadService {
    config;
    s3;
    bucket;
    publicUrl;
    constructor(config) {
        this.config = config;
        this.bucket = config.get('S3_BUCKET') || 'alcove-residences';
        this.publicUrl = config.get('S3_PUBLIC_URL') || '';
        this.s3 = new client_s3_1.S3Client({
            region: config.get('S3_REGION') || 'ap-southeast-1',
            endpoint: config.get('S3_ENDPOINT'),
            credentials: {
                accessKeyId: config.get('S3_ACCESS_KEY_ID') || '',
                secretAccessKey: config.get('S3_SECRET_ACCESS_KEY') || '',
            },
            forcePathStyle: true,
        });
    }
    async getPresignedUrl(filename, contentType) {
        const key = `uploads/${(0, uuid_1.v4)()}-${filename}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        });
        const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 3600 });
        const publicUrl = this.publicUrl ? `${this.publicUrl}/${key}` : uploadUrl.split('?')[0];
        return { uploadUrl, publicUrl, key };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map