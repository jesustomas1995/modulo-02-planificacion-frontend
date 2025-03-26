import gatewayClient from "@/api/gatewayClient";
import { TOKEN_KEY, USER_INFO_KEY } from '@/common/constant/localstorage.constant';

export const login_service = async (data: any): Promise<any> => {
    const response = await gatewayClient.post(`/api/auth/login`, data);
    return response.data;
};