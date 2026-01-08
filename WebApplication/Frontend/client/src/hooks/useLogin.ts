import { useState } from "react";
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const[error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try
        {
            await login(email, password);
            navigate('/home');
        }catch(error: any) {
            setError("Login failed!");
        }
    };
    return{
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleSubmit,
    };
};
export default useLogin;