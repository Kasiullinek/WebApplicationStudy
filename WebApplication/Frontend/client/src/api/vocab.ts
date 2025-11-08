import axios from "axios";
import type { ISetDto } from "../interfaces/ISetDto";

const API_URL = 'http://localhost:5271/api/VocabularySet';

export const fetchBasicSets = async (): Promise<ISetDto[]> => {
    try
    {
        const response = await axios.get<ISetDto[]>(`${API_URL}/GetBasicSets`);
        return response.data;
    }
    catch(error: any) {
        throw error.response?.data || "Failed to Fetch Basic Vocabulary Sets!";
    }
};