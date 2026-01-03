import axios from "axios";
import type { AuthResponse } from "../interfaces/AuthResponse";
import type { JwtPayload } from "../interfaces/JWTPayload";
import {jwtDecode} from "jwt-decode";

const API_URL = 'http://localhost:5271/api/account';

export const login = async (email: string, password: string): Promise<JwtPayload> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
        const decoded = jwtDecode<JwtPayload>(response.data.token);
        const role = decoded.role || (decoded as any).roles?.[0] || (decoded as any)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
        localStorage.setItem('token', response.data.token);
        if (role) {
            localStorage.setItem('role', role);
        }
        return decoded;
    } catch (error: any) {
        throw error.response?.data || "Login failed!";
    }
};

export const register = async(email: string, password: string, confirmPassword: string,): Promise<AuthResponse> => {
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
    localStorage.removeItem('role');
}