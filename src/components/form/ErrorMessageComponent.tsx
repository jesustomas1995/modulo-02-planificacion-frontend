const ErrorMessage = ({ error }: { error: any }) => (error ? <p style={{ color: 'red' }}>{error.message}</p> : null);

export default ErrorMessage;
