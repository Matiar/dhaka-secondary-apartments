export declare class RegisterDto {
    email: string;
    name: string;
    password: string;
    phone?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class OtpRequestDto {
    phone: string;
    email?: string;
    name?: string;
}
export declare class OtpVerifyDto {
    phone: string;
    otp: string;
}
