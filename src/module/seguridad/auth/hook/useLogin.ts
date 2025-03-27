import { useRef, useState } from 'react';
import { login_service } from '../service/LoginService';
import { useMutation } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { TOKEN_KEY, USER_INFO_KEY, USUARIO_ID } from '@/common/constant/localstorage.constant';
import { parseJwt } from '@/common/util/tokenUtils';
import { jwtDecode } from "jwt-decode";

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useNavigate();
    const { refreshUser } = useUser();
    const toast = useRef<Toast | null>(null);

    const handleLoginSuccess = async (response: any) => {
        const result = parseJwt(response.data);
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(result));
        localStorage.setItem(TOKEN_KEY, response.data);

        const decodedToken = jwtDecode<{ id: number; nombreCompleto: string }>(response.data);
        const userId = decodedToken.id;
        localStorage.setItem(USUARIO_ID, String(userId));

        toast.current?.show({
            severity: 'success',
            summary: 'Operación Exitosa',
            detail: response.message,
            life: 3000,
        });

        await new Promise<void>((resolve) => {
            refreshUser();
            setTimeout(resolve, 1000);
        });
        router('/admin/planificacion/presupuesto');
    };


    // Regular login
    const mutationForm = useMutation({
        mutationFn: (data: any) => login_service(data),
        onSuccess: async (response: any) => {
            await handleLoginSuccess(response);
            setLoading(false);
        },
        onError: (result: any) => {
            console.log(result)
            toast.current?.show({
                severity: 'error',
                summary: 'Operación Fallida',
                detail: result.response?.data.message,
                life: 3000,
            });
            setLoading(false);
        },
    });

    const onLogin = (data: any) => {
        setLoading(true);
        mutationForm.mutate({
            usuario: data.usuario,
            password: data.password,
        });
    };

    return {
        onLogin,
        loading,
        toast,
    };
};

export default useLogin;
