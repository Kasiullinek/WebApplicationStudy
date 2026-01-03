import api from "./axiosInstance";
import type { ISet } from "../interfaces/SetInterface";


const API_URL = '/VocabularySet';

export const fetchBasicSets = async (): Promise<ISet[]> => {
    try
    {
        const response = await api.get<ISet[]>(`${API_URL}/GetBasicSets`);
        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || "Failed to Fetch Basic Vocabulary Sets!";
    }
};

export const fetchUserSets = async (): Promise<ISet[]> => {
    try
    {
        const response = await api.get<ISet[]>(`${API_URL}/GetUserSets`);
        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || "Failed to Fetch Basic Vocabulary Sets!";
    }
};