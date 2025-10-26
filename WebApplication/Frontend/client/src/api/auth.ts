import axios from "axios";

const API_URL = 'http://localhost:5271/api/account';

interface AuthResponse {
    token: string;
    user: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {

    try{
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, {email, password});
        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || "Login failed!";
    }
};

export const register = async(
    email: string,
    password: string,
    confirmPassword: string,
): Promise<AuthResponse> => {
    try{
        const response = await axios.post<AuthResponse>(`${API_URL}/register`, {email, password, confirmPassword});
        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || "Registration failed!";
    }
};

export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}