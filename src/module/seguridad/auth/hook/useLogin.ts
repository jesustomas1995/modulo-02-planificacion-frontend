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
        console.log("🔑 response... ", response);
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(result));
        localStorage.setItem(TOKEN_KEY, response.data);

        const decodedToken = jwtDecode<{ usuario_id: number; app_name: string }>(response.data);
        const userId = decodedToken.usuario_id;
        localStorage.setItem(USUARIO_ID, String(userId));

        if (Notification.permission === "default") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    // console.log("✅ Permiso de notificación concedido");
                } else {
                    console.warn("⚠️ Permiso de notificación denegado");
                }
            });
        }

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

        router('/dashboard');
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
            contraseña: data.password,
        });
    };

    return {
        onLogin,
        loading,
        toast,
    };
};

export default useLogin;
