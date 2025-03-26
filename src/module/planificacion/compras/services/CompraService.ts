import gatewayClient from "@/api/gatewayClient"

const PREFIX_SERVICE = "api/planificacion/compra"

export interface IFechtFilter {
    page: number,
    limit: number,
    // where: any
}

// Tipos para las respuestas
export interface IApiResponse<T> {
    data: T;
    message?: string;
    status?: number;
}

export const fetchList = async (body: any): Promise<any> => {
    const response = await gatewayClient.post(`${PREFIX_SERVICE}/list`, body);
    //console.log("estados fetching", response.data);
    return response.data;

};

export const fetchById = async (id: number): Promise<any> => {
    const response = await gatewayClient.get(`${PREFIX_SERVICE}/${id}`);
    return response.data;
};

export const create = async ({ id, ...data }: any): Promise<any> => {
    const response = await gatewayClient.post(PREFIX_SERVICE, data);
    return response.data;
};

export const update = async (id: number, updatedPost: any): Promise<any> => {
    const response = await gatewayClient.put(`${PREFIX_SERVICE}/${id}`, updatedPost);
    return response.data;
};

export const remove = async (id: number, estado: boolean): Promise<any> => {
    const response = await gatewayClient.patch(`${PREFIX_SERVICE}/${id}`, { registerActive: estado });
    return response.data;
};

export const fetchAll = async (): Promise<any> => {
    const response = await gatewayClient.post(`${PREFIX_SERVICE}/list`, {
        page: 1,
        limit: 1000,
    });
    return response.data;
};
