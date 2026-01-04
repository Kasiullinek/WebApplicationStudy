import React, { useEffect, useState } from "react";
import { fetchBasicSets } from "../api/vocab"; 
import type { ISet } from "../interfaces/SetInterface";

export const useVocabSets = () => {
    const [sets, setSets] = useState<ISet[]>([]);
    const [expandedSetIds, setExpandedSetIds] = useState<number[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
      const loadSets = async () => {
        try {
          const data = await fetchBasicSets();
          setSets(data);
        } catch (err: any) {
          setError(err.toString());
        } finally {
          setLoading(false);
        }
      };
  
      loadSets();
    }, []);
  
    const toggleExpand = (setId: number) => {
      setExpandedSetIds(prev => prev.includes(setId) ? prev.filter(id => id !== setId) : [...prev, setId]
      );
    };

    const filteredSets = sets.filter((set) =>
    set.title.toLowerCase().includes(search.toLowerCase())
  );

  return {
    loading,
    error,
    sets,
    setSearch,
    search,
    expandedSetIds,
    toggleExpand,
    filteredSets
  };
};
export default useVocabSets;