import { useEffect, useState } from "react";
import { fetchUserSets, fetchUserSet, updateVocabularySet} from "../api/vocab"; 
import type { ISet } from "../interfaces/SetInterface";

export const useUserSets = () => {
    const [sets, setSets] = useState<ISet[]>([]);
    const [expandedSetIds, setExpandedSetIds] = useState<number[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editedSet, setEditedSet] = useState<ISet | null>(null);
    const [editLoading, setEditLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
  
  useEffect(() => {
      const loadSets = async () => {
        try {
          const data = await fetchUserSets();
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

  const onEditSet = async (setId: number) => {
    try {
      setEditLoading(true);
      setError(null);
      const set = await fetchUserSet(setId);
      setEditedSet(set);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setEditLoading(false);
    }
  };

  const onSaveSet = async () => {
  if (!editedSet) return;

  try {
    setSaveLoading(true);
    setError(null);
    await updateVocabularySet(editedSet);
    setSets(prev =>
      prev.map(set => set.id === editedSet.id ? editedSet : set));
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setSaveLoading(false);
    }
  };

  
  return {
    loading,
    error,
    sets,
    setSearch,
    search,
    expandedSetIds,
    toggleExpand,
    filteredSets,
    editedSet,
    editLoading,
    setEditedSet,
    onEditSet,
    onSaveSet,
    saveLoading,
  };
};
export default useUserSets;