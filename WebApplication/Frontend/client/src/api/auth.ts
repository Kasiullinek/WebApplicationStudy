import axios from "axios";
import type { IAuthResponse } from "../interfaces/IAuthResponse";

const API_URL = 'http://localhost:5271/api/account';

export const login = async (email: string, password: string): Promise<IAuthResponse> => {

    try{
        const response = await axios.post<IAuthResponse>(`${API_URL}/login`, {email, password});
        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || "Login failed!";
    }
};

export const register = async(email: string, password: string, confirmPassword: string,
): Promise<IAuthResponse> => {
    try{
        const response = await axios.post<IAuthResponse>(`${API_URL}/register`, {email, password, confirmPassword});
        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || "Registration failed!";
    }
};

export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}