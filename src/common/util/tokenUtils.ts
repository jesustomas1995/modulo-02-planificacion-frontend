import { jwtDecode } from "jwt-decode";
export const parseJwt = (token: string) => {
    try {
        return jwtDecode(token); 
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
};
