import { useEffect, useState } from "react";
import type { IRow } from "../interfaces/RowInterface";
import type { ISet } from "../interfaces/SetInterface";
import { fetchBasicSets, fetchUserSets } from "../api/vocab";
import { useUserRole } from "./useUserRole";

const MIN_ROWS_REQUIRED = 5;
const MAX_SETS_REQUIRED = 3;

export const useFlashcards = () => {
  const { role } = useUserRole();
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState<ISet[]>([]);
  const [selectedSets, setSelectedSets] = useState<ISet[]>([]);
  const [expandedSetIds, setExpandedSetIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [infoMessage, setInfoMessage] = useState("Wybierz zestaw(y), aby rozpocząć!");
  const [error, setError] = useState("");
  

  useEffect(() => {
    const loadSets = async () => {
      try {
        let data: ISet[] = [];

        if(role==="User"){
          data = await fetchUserSets();
        }
        else{
          data = await fetchBasicSets();
        }
        
        setSets(data);
      } catch (err: any) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };
    loadSets();
  }, [role]);

  const toggleExpand = (setId: number) => {
    setExpandedSetIds(prev =>
      prev.includes(setId) ? prev.filter(id => id !== setId) : [...prev, setId]
    );
  };

  const handleSelectSet = (set: ISet) => {
    if (gameStarted) {
      return;
    }

    const alreadySelected = selectedSets.find((s) => s.id === set.id);

    if (alreadySelected) {
      setSelectedSets(selectedSets.filter((s) => s.id !== set.id));
      setInfoMessage("Wybierz zestaw(y), aby rozpocząć!");
    } else {
      if (selectedSets.length >= MAX_SETS_REQUIRED) {
        setInfoMessage(`Możesz wybrać maksymalnie ${MAX_SETS_REQUIRED} zestawy!`);
        return;
      }
      setSelectedSets([...selectedSets, set]);
      setInfoMessage("");
    }
  };

  const handleStartGame = () => {
    const totalWords = selectedSets.reduce((sum, set) => sum + set.rows.length, 0);

    if (totalWords < MIN_ROWS_REQUIRED) {
      setInfoMessage(
        `Za mało słówek (min. ${MIN_ROWS_REQUIRED}). Wybierz więcej zestawów lub uzupełnij zawartość.`
      );
      return;
    }

    setInfoMessage("");
    setGameStarted(true);
    setCurrentIndex(0);
    setShowBack(false);
  };

  const handleNextCard = () => {
    if (currentIndex < getAllRows().length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowBack(false);
    }
  };

  const handleRestart = () => {
    setGameStarted(false);
    setCurrentIndex(0);
    setShowBack(false);
  };

  const getAllRows = (): IRow[] => {
    return selectedSets.flatMap((set) => set.rows);
  };

  const filteredSets = sets.filter((set) =>
    set.title.toLowerCase().includes(search.toLowerCase())
  );

  const rows = getAllRows();

  return {
    loading,
    error,
    sets,
    selectedSets,
    expandedSetIds,
    search,
    setSearch,
    toggleExpand,
    handleSelectSet,
    gameStarted,
    handleStartGame,
    handleNextCard,
    handlePrevCard,
    handleRestart,
    showBack,
    setShowBack,
    currentIndex,
    rows,
    infoMessage,
    filteredSets
  };
};
export default useFlashcards;