import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../api/auth';

export const useRegister = () => {
    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const[confirmPassword, setConfirmPassword] = useState<string>('');
    const[error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if(password !== confirmPassword){
                setError("Passwords do not match!");
                return;
            }

            try
            {
                await register(email, password, confirmPassword);
                navigate('/login');
            }catch(error: any) {
                setError("Registration failed!");
            }
        };
    return{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        handleSubmit,
    };
};
export default useRegister;