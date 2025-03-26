export const numeroFormateado = (numero: any) => {
    try {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numero);
    } catch (error) {
        console.log(error)
    }
}
